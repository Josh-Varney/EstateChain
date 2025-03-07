module.exports = {
    presets: [
      '@babel/preset-env', // for ES6+ compatibility
      '@babel/preset-react', // for React JSX
      '@babel/preset-typescript', // for TypeScript support
    ],
    plugins: ['@babel/plugin-proposal-class-properties'], // If using class properties
  };
  