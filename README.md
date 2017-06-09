# pick
by [Grayson Gilmore](https://github.com/gilmoreg/).

[See the live site here](https://www.pick.moe/).

## Summary
Many fans of anime keep track of shows they plan to watch on a site called Myanimelist. Many times this list can grow to dozens of shows, leaving them flustered as to what they should watch next. They end up posting their list on social media asking others to help them choose. Pick makes this easier by generating a poll out of a user's plan to watch list which they can then share. Others can quickly vote for a show without having to type out a comment or an argument, and the user can quickly see which option is a crowd favorite.

## Technical
* This is a fullstack Node/Koa app.
* Polls are stored in a MongoDB database.
* Votes are rate limited by origin
* See the source for other details

## Build
Requires the following environment variable:
```
DATABASE=mongodb://<user>:<password>@<host>/pick
```

```
git clone https://github.com/gilmoreg/pick.git
cd pick
npm install
npm start
```