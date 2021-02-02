const feed = require('../../feed.json');
const shopData = require('../../shop.json');

const CURRENCY_SIGNS = {
    'RUB': '₽',
    'RUR': '₽',
    'EUR': '€',
    'USD': '$',
    'BYN': 'р.',
    'BYR': 'р.',
};

function formatPrice(value, currencyId) {
    const price = value.toLocaleString('ru', {
        minimumFractionDigits: value % 1 ? 2 : 0,
    });

    const currencySign = CURRENCY_SIGNS[currencyId];

    return currencySign ? `${price}\u00A0${currencySign}` : price;
}

module.exports = function() {
    const { offers: rawOffers, categories: rawCategories } = feed.yml_catalog.shop;

    const categories = rawCategories.category.map((category) => ({
        ...category._attributes,
        name: category._text,
        children: [],
        offers: [],
    }));

    const categoriesById = categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
    }, {});

    categories.forEach((category) => {
        if (category.parentId) {
            const parent = categoriesById[category.parentId];

            category.parent = parent;
            parent.children.push(category);
        }
    });

    const offers = rawOffers.offer.map((rawOffer) => {
        const offer = {...rawOffer._attributes };

        ['url', 'price', 'oldprice', 'currencyId', 'categoryId', 'vendor', 'model', 'description'].forEach((field) => {
            if (rawOffer[field]) {
                offer[field] = rawOffer[field]._text;
            }
        });

        offer.id = new URL(offer.url).pathname.replace('/rnd/', '');
        offer.discount = 0;
        offer.priceFormatted = formatPrice(parseInt(offer.price), offer.currencyId);

        if (offer.oldprice) {
            offer.discount = offer.oldprice - offer.price;
            offer.oldPriceFormatted = formatPrice(parseInt(offer.oldprice), offer.currencyId);
        }

        offer.pictures = [].concat(rawOffer.picture || []).map((picture) => picture._text);

        const category = categoriesById[offer.categoryId];

        if (category) {
            category.offers.push(offer);

            let parent = category.parent;

            while (parent) {
                parent.offers.push(offer);
                parent = parent.parent;
            }

            offer.category = category;
        }

        return offer;
    });

    return {
        categories,
        rootCategories: categories.filter((category) => !category.parentId),
        offers,
        discounts: offers.sort((a, b) => b.discount - a.discount).slice(0, 5),
        ...shopData,
    };
};
