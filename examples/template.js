'use strict';

// When not cloning the `node-wit` repo, replace the `require` like so:
// const Wit = require('node-wit').Wit;
const Wit = require('../').Wit;

const token = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/template.js <wit-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    if (entities.intent) {
      context.intent = entities.intent;
    }else{
      console.log(entities);
    }
    cb(context);
  },
  error(sessionId, context, err) {
    console.log(err.message);
  },
  intent_is_news(sessionId, context, cb){
    console.log("Intent is: ", context.intent);
    cb();
  }
};

const client = new Wit(token, actions);
client.interactive();
