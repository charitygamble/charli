const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.addCollection("reviews", async (collectionsApi) => {
        return collectionsApi.getFilteredByGlob("./src/blog/*.md").reverse().slice(0, 3);
    });

    return {
        dir: {
            input: 'src',
            output: 'public'
        }
    };
}