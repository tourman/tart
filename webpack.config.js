const deepMerge = require('deepmerge');

const base = require('./webpack.base.config');
const development = require('./webpack.development.config');
const production = require('./webpack.production.config');

const envMap = {
  production,
  development,
};
const env = envMap[process.env.NODE_ENV] || development;

const merge = (...configs) => {
  const result = deepMerge(...configs);
  result.plugins = configs.reduce((memo, config) => {
    const configPlugins = config.plugins || [];
    const nextMemo = memo.concat(configPlugins);
    return nextMemo;
  }, []);
  return result;
};

const config = merge(base, env);

module.exports = config;
