const path = require("path");

module.exports = {
  title: "SSv2 Project Documentation",
  sections: [
    {
      name: "Introduction",
      content: "docs/pages/introduction.md"
    },
    {
      name: "Widgets",
      content: "docs/pages/widgets.md",
      components: "src/widgets/**/[A-Z]*.jsx"
    },
    {
      name: "Default Containers",
      content: "docs/pages/dynamic-layout.md",
      components: "src/containers/**/Default[A-Z]*.jsx"
    },
    {
      name: "Components",
      components: "src/components/**/[A-Z]*.jsx",
      exampleMode: "expand",
      usageMode: "expand"
    }
  ],

  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            presets: ['@babel/react', '@babel/env']
            
          }
        },
        {
          test: /\.(scss|css)$/,
          loaders: [
            require.resolve("style-loader"),
            require.resolve("css-loader"),
            require.resolve("sass-loader")
          ]
        }
      ]
    },
    resolve: {
			alias: {
				// Make sure the example uses the local version of react-styleguidist
				// This is only for the examples in this repo, you won't need it for your own project
				'react-styleguidist': path.join(__dirname, '../../'),
			},
		},
  }
};

  // Override Styleguidist components
//   styleguideComponents: {
//     StyleGuideRenderer: path.join(__dirname, "docs/components/StyleGuide"),
//     SectionsRenderer: path.join(__dirname, "docs/components/SectionsRenderer")
//   },
