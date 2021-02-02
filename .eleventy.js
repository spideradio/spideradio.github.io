module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksFilter('truncate', (value) => value.length > 200 ? `${value.substring(0, 200)}...` : value);

    return {
        dir: {
            input: 'src',
            output: 'docs',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data',
        },
    };
};
