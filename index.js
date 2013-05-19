module.exports = process.env.SPECIALIZEDSET_COV
  ? require('./lib-cov')
  : require('./lib');
