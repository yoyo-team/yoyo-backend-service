let vars={};
global.vars=vars;
vars.db=require('db').mysql;
vars.redis=require('db').redis();

require('./express_framework/lib/http_server');