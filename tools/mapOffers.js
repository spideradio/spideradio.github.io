const updateJsonFeed = require('./updateJsonFeed');

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 2 - min));
const getRandomString = () => Math.random()
    .toString(36).substring(getRandomInt(2, 10));

const getRandomSentence = length => new Array(length)
    .fill(1).map(getRandomString).join(' ');

const wrapValue = value => ({ _text: value });

updateJsonFeed(feed => {
    const offers = feed.yml_catalog.shop.offers.offer;

    offers.forEach(offer => {
        const picture = new Array(getRandomInt(1, 5))
            .fill(wrapValue('https://source.unsplash.com/random/300x600'))
            .map(value => wrapValue(value._text + `&rnd=${getRandomString()}`));

        offer.picture = picture.length > 1 ? picture : picture[0];
        // offer.url = wrapValue(`http://t92636qr.beget.tech/index.php?route=product/search&search=${getRandomString()}`);

        // offer.vendor = wrapValue(getRandomSentence(getRandomInt(1, 3)));
        // offer.model = wrapValue(getRandomSentence(getRandomInt(2, 5)));
        // offer.description = wrapValue(getRandomSentence(getRandomInt(5, 15)));
    });

    return feed;
});
