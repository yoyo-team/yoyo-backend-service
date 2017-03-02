let vars={};
global.vars=vars;
vars.db=require('db').mysql;
vars.redis=require('db').redis();
vars.check=require('db').redis.check.access_token;

require('./express_framework/lib/http_server');