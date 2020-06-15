const { resolve } = require('path');
const { readJsonSync, writeJsonSync } = require('fs-extra');

const jsonFeedPath = resolve(__dirname, '../feed.json');

const readFeed = () => readJsonSync(jsonFeedPath);
const writeFeed = feed => writeJsonSync(
    jsonFeedPath,
    feed,
    { encoding: 'utf-8', spaces: 4 },
);

const updateJsonFeed = func => {
    const feed = readFeed();
    const updatedFeed = func(feed);
    writeFeed(updatedFeed ? updatedFeed : feed);
};

module.exports = updateJsonFeed;
