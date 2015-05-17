
var config = {
  path:"",//root of the project dir;
  db:"mongodb://localhost/action",
};

if(process.env.NODE_ENV=='development'){
  config.db='mongodb://192.168.59.103/action';
}
config.path=process.cwd();

module.exports = config;
