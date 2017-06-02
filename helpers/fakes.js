const malSearchXML = `
<?xml version="1.0" encoding="UTF-8"?>
<myanimelist>
    <myinfo>
        <user_id>0</user_id>
        <user_name>test</user_name>
        <user_watching>22</user_watching>
        <user_completed>241</user_completed>
        <user_onhold>10</user_onhold>
        <user_dropped>28</user_dropped>
        <user_plantowatch>85</user_plantowatch>
        <user_days_spent_watching>43.19</user_days_spent_watching>
    </myinfo>
    <anime>
        <series_animedb_id>1</series_animedb_id>
        <series_title>Cowboy Bebop</series_title>
        <series_synonyms>; Cowboy Bebop</series_synonyms>
        <series_type>1</series_type>
        <series_episodes>26</series_episodes>
        <series_status>2</series_status>
        <series_start>1998-04-03</series_start>
        <series_end>1999-04-24</series_end>
        <series_image>https://myanimelist.cdn-dena.com/images/anime/4/19644.jpg</series_image>
        <my_id>0</my_id>
        <my_watched_episodes>26</my_watched_episodes>
        <my_start_date>0000-00-00</my_start_date>
        <my_finish_date>0000-00-00</my_finish_date>
        <my_score>10</my_score>
        <my_status>2</my_status>
        <my_rewatching>0</my_rewatching>
        <my_rewatching_ep>0</my_rewatching_ep>
        <my_last_updated>1493357900</my_last_updated>
        <my_tags></my_tags>
    </anime>
    <anime>
        <series_animedb_id>5</series_animedb_id>
        <series_title>Cowboy Bebop: Tengoku no Tobira</series_title>
        <series_synonyms>Cowboy Bebop: Knockin' on Heaven's Door; Cowboy Bebop: The Movie</series_synonyms>
        <series_type>3</series_type>
        <series_episodes>1</series_episodes>
        <series_status>2</series_status>
        <series_start>2001-09-01</series_start>
        <series_end>2001-09-01</series_end>
        <series_image>https://myanimelist.cdn-dena.com/images/anime/6/14331.jpg</series_image>
        <my_id>0</my_id>
        <my_watched_episodes>0</my_watched_episodes>
        <my_start_date>0000-00-00</my_start_date>
        <my_finish_date>0000-00-00</my_finish_date>
        <my_score>0</my_score>
        <my_status>6</my_status>
        <my_rewatching>0</my_rewatching>
        <my_rewatching_ep>0</my_rewatching_ep>
        <my_last_updated>1493678445</my_last_updated>
        <my_tags></my_tags>
    </anime>
</myanimelist>`.trim().replace(/(\r\n|\n|\r)/gm, '');
module.exports = {
  malXML: '<?xml version="1.0" encoding="utf-8"?><anime><entry><id>269</id></entry></anime>',

  malSearchResponse: {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
    body: malSearchXML,
    sendAsJson: false,
  },

  malEmptySearchResponse: {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
    body: '<?xml version="1.0" encoding="UTF-8" ?><myanimelist></myanimelist>',
    sendAsJson: false,
  },

  malAuthSuccess: {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
    body: '<?xml version="1.0" encoding="utf-8"?><user><id>0</id><username>test</username></user>',
  },

  malAuthFail: {
    status: 401,
    body: 'Invalid credentials',
  },
};
