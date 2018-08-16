const { DEV_MODE, GITHUB_API_ENABLED } = require('./config');
const app = require('./app');
const logger = require('./logger');

app.listen(app.get('port'), () => {
  logger.info(`Git-API is now running at ${app.get('host')}:${app.get('port')}`);
  logger.info(`Development mode is set to ${DEV_MODE}`);
  logger.info(`Enable actual GitHub API is set to ${GITHUB_API_ENABLED}`);
  logger.info('Press Ctrl+C to stop');
});
