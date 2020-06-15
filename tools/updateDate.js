const dateFormat = require('dateformat');
const updateJsonFeed = require('./updateJsonFeed');

updateJsonFeed((feed => {
    const updatedDate = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
    feed.yml_catalog._attributes.date = updatedDate;
    return feed;
}));
