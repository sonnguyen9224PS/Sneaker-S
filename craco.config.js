const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#400D51",
              "@text-color": "#6a6a6a",
              "@link-color": "#293341",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
