module.exports = {
  default: {
    require: ['bdd/steps/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['bdd/features/*.feature'],
    format: ['progress']
  }
};
