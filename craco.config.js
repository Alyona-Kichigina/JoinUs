const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Styles': path.resolve(__dirname, 'src/styles'),
        }
    },
};
