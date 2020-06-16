const updateJsonFeed = require('./updateJsonFeed');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 2 - min));
const getRandomString = () => Math.random()
    .toString(36).substring(getRandomInt(2, 10));

const wrapValue = value => ({ _text: value });

updateJsonFeed(feed => {
    const offers = feed.yml_catalog.shop.offers.offer;

    offers.forEach(offer => {
        const picture = new Array(getRandomInt(0, 5))
            .fill(wrapValue(`https://spideradio.github.io/test-yml/img/`))
            .map(value => wrapValue(value._text + `${getRandomInt(1, 17)}.jpeg`));

        if (picture.length) {
            offer.picture = picture.length > 1 ? picture : picture[0];
        } else {
            delete offer.picture;
        }

        // offer.url = wrapValue(`http://t92636qr.beget.tech/index.php?route=product/search&search=${getRandomString()}`);

        // offer.vendor = wrapValue(lorem.generateWords(getRandomInt(1, 3)));
        // offer.model = wrapValue(lorem.generateWords(getRandomInt(2, 4)));
        // offer.description = wrapValue(lorem.generateSentences(getRandomInt(2, 7)));
    });

    return feed;
});
