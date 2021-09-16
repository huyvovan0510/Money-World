module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.jsx', '.js', '.json'],
        alias: {
          '@navigation': '',
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
