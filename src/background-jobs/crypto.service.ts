import axios from 'axios';
import { CryptoHistory, ICrypto } from '../models/crypto.models';
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
const fetchCryptoData: any = async (
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

export const fetchInsertData = async (vs_currency: string, ids: string) => {
  try {
    const data = await fetchCryptoData(vs_currency, ids);
    // console.log(data);
    const documents: ICrypto[] = data.map((item: any) => ({
      coinId: item.id,
      symbol: item.symbol.toUpperCase(),
      priceUSD: item.current_price,
      marketCapUSD: item.market_cap,
      percentchange24h: item.price_change_percentage_24h,
      fetchedAt: new Date(item.last_updated),
    }));
    await CryptoHistory.insertMany(documents);
  } catch (error: any) {
    console.error('Error While Inserting the Data', error.message);
  }
};
