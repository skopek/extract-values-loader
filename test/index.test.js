const webpack = require('webpack');
const pify = require('pify');
const webpackConfig = require('./fixture/webpack.config');

test('extract values', async () => {
  const compiler = webpack(webpackConfig);

  compiler.run = pify(compiler.run);

  const stats = await compiler.run();

  expect(stats.hasErrors()).toBeFalsy();

  const items = require('./fixture/dist/items');

  expect(items.length).toBe(2);
  expect(items).toContainEqual({ priority: 3, file: './test/fixture/lib/1.item.js' });
  expect(items).toContainEqual({ priority: 5, file: './test/fixture/lib/2.item.js' });
});