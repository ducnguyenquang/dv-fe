const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#E5704B',
              '@layout-header-background': '#E5704B',
              '@font-family': "'Roboto', 'Open Sans', sans-serif",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
