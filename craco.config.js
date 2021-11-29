const path = require(`path`);

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Styles': path.resolve(__dirname, 'src/styles'),
        }
    },
};
