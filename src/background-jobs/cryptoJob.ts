import cron from 'node-cron';
import { fetchInsertData } from './crypto.service';

cron.schedule('*/5 * * * * ', async () => {
  console.log('Running crypto data fetch job');

  try {
    await fetchInsertData('usd', 'bitcoin,ethereum,matic-network');
    console.log('Crypto data fetched and inserted successfully');
  } catch (error) {
    console.error('Error in crypto data fetch job:', error);

    //TODO:Add Specific Error handling hhere
  }
});
console.log('Crypto data fetch job scheduled to run every 5 minutes');

export default cron;
