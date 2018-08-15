const gitService = require('./git.service');

function getServices() {
  const servicesMap = {};

  const services = [
    { name: 'git', source: gitService },
  ];

  services.forEach(({ name, source }) => {
    servicesMap[name] = source;
  });

  return servicesMap;
}

module.exports = getServices();
