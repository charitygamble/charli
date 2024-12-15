const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.addCollection("posts", async (collection) =>
    collection.getFilteredByGlob("./src/posts/**/*").reduce(
        (map, i) => ({
            ...map,
            [i.data.type]: [...(map[i.data.type] ?? []), i],
        }),
        {}
    )
);

    return {
        dir: {
            input: 'src',
            output: 'public'
        }
    };
}