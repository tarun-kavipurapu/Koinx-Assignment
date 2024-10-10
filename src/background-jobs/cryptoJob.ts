import cron from 'node-cron';
import { fetchInsertData } from './crypto.service';

cron.schedule('0 */2 * * *', async () => {
  console.log('Running crypto data fetch job');

  try {
    await fetchInsertData('usd', 'bitcoin,ethereum,matic-network');
    console.log('Crypto data fetched and inserted successfully');
  } catch (error) {
    console.error('Error in crypto data fetch job:', error);

    // TODO: Add specific error handling here
  }
});

console.log('Crypto data fetch job scheduled to run every 2 Hrs');

export default cron;
