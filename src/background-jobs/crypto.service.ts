import axios from 'axios';
import { resolve } from 'path';
//ids can be seeperated by a , example bitcoin,ethereum,matic-network
//This is Called Every Two Hrs by the cryptoJob cron job
/**
 TODO: Create an Interface with the Response Data and typecast the Return type of the function
 *@param vs_currency 
 *@param ids
 *@param retries 
 *@description
 * 
 * 
 * Dont Keep max_retries as a large number you may hit ratelimir by coingecko
 */

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; //1second
export const fetchCryptoData: any = async (
  vs_currency: string,
  ids: string,
  retries = MAX_RETRIES,
) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: vs_currency,
          ids: ids,
        },
      },
    );

    console.log(response.data);

    return response.data;
  } catch (error: any) {
    if (retries > 0) {
      console.warn(
        `Fetch Failed Retrying To Fetch in ${RETRY_DELAY / 100}Second... `,
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchCryptoData(vs_currency, ids, retries - 1);
    } else {
      console.error('Failed to fetch crypto data:', error.message);
    }
  }
};
