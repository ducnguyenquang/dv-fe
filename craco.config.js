const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4773EB',
              '@layout-header-background': '#4773EB',
              '@font-family': "'Roboto', 'Open Sans', sans-serif",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
