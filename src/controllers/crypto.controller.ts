import { Request, Response } from 'express';
import { asyncHandler } from '../utils/AsyncHandler';
import { ApiError } from '../utils/ApiError';
import { CryptoHistory } from '../models/crypto.models';
import { ApiResponse } from '../utils/ApiResponse';

export const getCryptoStats = asyncHandler(
  async (req: Request, res: Response) => {
    const { coin } = req.query;
    if (!coin) {
      throw new ApiError(400, 'Coin query parameter is required');
    }

    const coinUpperCase = (coin as string).toUpperCase();

    const latestData = await CryptoHistory.findOne({
      coinId: coinUpperCase,
    }).sort({
      fetchedAt: -1,
    });

    if (!latestData) {
      throw new ApiError(500, 'Error Fetching Data from DB');
    }

    const response = {
      price: latestData.priceUSD,
      marketCap: latestData.marketCapUSD,
      '24Change': latestData.percentchange24h,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, response, 'Stats fetched Sucessfully'));
  },
);

export const getCryptoDeviation = asyncHandler(
  async (req: Request, res: Response) => {
    const { coin } = req.query;

    if (!coin) {
      throw new ApiError(400, 'Coin query parameter is required');
    }
    const coinUpperCase = (coin as string).toUpperCase();
    //Performing Standard Deviation Calculation in MongoDb atlas Would be benificial and faster
    const deviationData = await CryptoHistory.aggregate([
      { $match: { coinId: coinUpperCase } },
      { $sort: { fetchedAt: -1 } },
      { $limit: 100 },
      { $group: { _id: null, priceStdDev: { $stdDevSamp: '$priceUSD' } } },
    ]);
    if (deviationData.length === 0 || deviationData[0].priceStdDev == null) {
      throw new ApiError(404, 'No data found for the requested cryptocurrency');
    }

    const stdDeviation = deviationData[0].priceStdDev.toFixed(8);
    const response = {
      priceUSDDeviation: parseFloat(stdDeviation),
    };
    return res
      .status(200)
      .json(new ApiResponse(200, response, 'Stats fetched Sucessfully'));
  },
);
