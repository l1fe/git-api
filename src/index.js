import { DEV_MODE } from './config';
import app from './app';

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.info(`Git-API is now running at ${app.get('host')}:${app.get('port')}`);
  console.info(`Development mode is set to ${DEV_MODE}`);
  console.info('Press Ctrl+C to stop');
  /* eslint-enable no-console */
});
