const gitService = require('./git.service');
const apiService = require('./api.service');

function getServices() {
  const servicesMap = {};

  const services = [
    { name: 'git', source: gitService },
    { name: 'api', source: apiService },
  ];

  services.forEach(({ name, source }) => {
    servicesMap[name] = source;
  });

  return servicesMap;
}

module.exports = getServices();
