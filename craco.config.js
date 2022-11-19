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
              "@text-color": "#000000",
              "@link-color": "#293341",
              "@border-color-base": "purple",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
