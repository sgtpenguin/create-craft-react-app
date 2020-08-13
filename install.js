var shell = require("shelljs");
var appRoot = require("app-root-path");

module.exports = () => {
  const args = process.argv.slice(2);
  const installPath = args[0];
  console.log("start");
  if (installPath) {
    const command = `sh ${__dirname}/create-craft-react-app.sh ${installPath}`;
    shell.exec(command);
  } else {
    console.log("no path");
  }
};
