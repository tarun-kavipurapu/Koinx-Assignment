import mongoose, { Schema } from 'mongoose';

export interface ICrypto extends Document {
  coinId: string;
  symbol: string;
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
  fetchedAt: Date;
}
const cryptoSchema = new Schema<ICrypto>({
  coinId: { type: String, required: true },
  symbol: { type: String, required: true },
  priceUSD: { type: Number, required: true },
  marketCapUSD: { type: Number, required: true },
  change24h: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now },
});

//lets keep last record first for easier fetching
cryptoSchema.index({ coinId: 1, fetchedAt: -1 });
export const Crypto = mongoose.model<ICrypto>('Crypto', cryptoSchema);
