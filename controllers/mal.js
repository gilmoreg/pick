/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Poll = require('../models/Poll');
const xml2js = require('xml2js');
// Fetch has to be require'd this way for testing purposes
global.fetch = require('node-fetch');

const parser = new xml2js.Parser();
mongoose.Promise = global.Promise;

const createPoll = poll =>
  new Promise(async (resolve, reject) => {
    await Poll.findOneAndRemove({ user: poll.user });
    const { user, list } = poll;
    const created = new Date().getTime();
    Poll.create({ user, list, created })
    .then(res => resolve(res))
    .catch(err => reject(err));
  });

const malAPICall = (auth, url) =>
  new Promise((resolve, reject) => {
    global.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
    .then(mal => resolve(mal.text()))
    .catch(err => reject(Error(err)));
  });

const checkMalCredentials = auth =>
  new Promise((resolve, reject) => {
    malAPICall(auth, 'https://myanimelist.net/api/account/verify_credentials.xml')
    .then((res) => {
      if (res) {
        if (res === 'Invalid credentials') resolve(res);
        parser.parseString(res, async (err, data) => {
          if (err) reject(Error(err));
          if (data && data.user && data.user.username) resolve(data.user.username[0]);
          reject(Error(data));
        });
      }
    })
    .catch(err => reject(Error(err)));
  });

const parseXML = list =>
  new Promise((resolve, reject) => {
    parser.parseString(list, (err, data) => {
      if (err) reject(Error(err));
      resolve(data);
    });
  });

const getPlanToWatch = (list) => {
  const { anime } = list.myanimelist;
  if (!anime) return Promise.resolve(null);
  const now = new Date();
  const filtered =
    anime
    // Status 6 is 'plan to watch'
    .filter(a => a.my_status[0] === '6')
    // Filter out shows that haven't aired yet
    .filter((a) => {
      const airDate = new Date(a.series_start);
      return (now - airDate >= 0);
    })
    .map(a => ({ title: a.series_title[0], id: a.series_animedb_id[0] }));
  return Promise.resolve(filtered);
};

const getMalList = username =>
  new Promise((resolve, reject) => {
    global.fetch(`https://myanimelist.net/malappinfo.php?status=all&type=anime&u=${username}`)
    .then(res => res.text())
    .then(res => parseXML(res))
    .then(list => getPlanToWatch(list))
    .then(ptw => resolve(ptw))
    .catch(err => reject(Error(err)));
  });

exports.list = async (ctx) => {
  let auth;
  // Check if credentials are present
  try {
    auth = ctx.request.query.auth;
  } catch (err) {
    return ctx.throw(400, 'You must supply MAL credentials.');
  }
  try {
    // See if we have good credentials
    const user = await checkMalCredentials(auth);
    if (user && user !== 'Invalid credentials') {
      // Fetch list
      const list = await getMalList(user);
      if (list && list.length) {
        // If we got a good list, create a poll and return it as JSON
        const poll = await createPoll({ user, list });
        ctx.body = { poll };
        return ctx.body;
      }
      // Good credentials but no anime; must be empty profile
      return ctx.throw(400, 'No anime found for that user.');
    }
    // No list; either bad credentials or empty profile
    return ctx.throw(400, 'Invalid MAL credentials.');
  } catch (err) {
    return ctx.throw(400, new Error(`/mal/list ${err}`));
  }
};
