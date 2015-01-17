
var config = {
  path:".",//root of the project dir;
  db:"mongodb://localhost/my_database",
};

config.path=process.cwd();

module.exports = config;
