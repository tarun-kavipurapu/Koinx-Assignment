
---

# Cryptocurrency Stats API

This Node.js application fetches and stores cryptocurrency data (price, market cap, and 24-hour change) for Bitcoin, Matic, and Ethereum using the CoinGecko API. It also provides endpoints for fetching the latest statistics and calculating the price deviation for the last 100 records stored in MongoDB.

### Deployed Ip:`http://54.81.82.21:8080`
## Features
- **Background Job**: Fetches and stores the latest price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum from CoinGecko every 2 hours.
- **API Endpoint `/stats`**: Retrieves the latest price, market cap, and 24-hour change for a given cryptocurrency.
- **API Endpoint `/deviation`**: Calculates and returns the standard deviation of the last 100 price records stored for the given cryptocurrency.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building the server.
- **Mongoose**: ODM for MongoDB.
- **Axios**: HTTP client for API calls to CoinGecko.
- **Node-Cron**: Scheduler for background jobs.
- **MongoDB**: Database for storing cryptocurrency data.


## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-stats-api.git
   cd crypto-stats-api
   ```

2. Install dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   ```

4. Start the application:
   ```bash
   pnpm dev
   ```

The server should now be running at `http://localhost:3000`.

## Background Job
The background job runs every 2 hours and fetches the latest data (price, market cap, and 24-hour change) for the following cryptocurrencies:
- **Bitcoin** (`bitcoin`)
- **Matic** (`matic-network`)
- **Ethereum** (`ethereum`)

Data is fetched from the CoinGecko API and stored in the MongoDB database. The CoinGecko IDs used are `bitcoin`, `matic-network`, and `ethereum`.

## API Endpoints

### 1. GET `/stats`
Fetch the latest data for the requested cryptocurrency.

#### Query Parameters:
- **coin**: The cryptocurrency ID. Must be one of the following: `bitcoin`, `matic-network`, `ethereum`.

#### Sample Request:
```bash
GET /stats?coin=bitcoin
```

#### Response Format:
```json
{
    "statusCode": 200,
    "data": {
        "price": 40000,
        "marketCap": 800000000,
        "24hChange": 3.4
    },
    "message": "Stats fetched successfully",
    "success": true
}
```

### 2. GET `/deviation`
Calculate and return the standard deviation of the price for the requested cryptocurrency based on the last 100 records stored in the database.

#### Query Parameters:
- **coin**: The cryptocurrency ID. Must be one of the following: `bitcoin`, `matic-network`, `ethereum`.

#### Sample Request:
```bash
GET /deviation?coin=bitcoin
```

#### Response Format:
```json
{
    "statusCode": 200,
    "data": {
        "priceUSDDeviation": 4082.48
    },
    "message": "Deviation calculated successfully",
    "success": true
}
```

## Sample Responses

### Success Response
```json
{
    "statusCode": 200,
    "data": {
        "priceUSDDeviation": 0.00059677
    },
    "message": "Stats fetched successfully",
    "success": true
}
```

### Error Response (Missing `coin` Parameter)
```json
{
    "success": false,
    "statusCode": 400,
    "message": "Coin query parameter is required",
    "errors": []
}
```

## Error Handling
- If the `coin` query parameter is missing or invalid, the API returns a `400` status code with an appropriate error message.
- All errors are caught and returned with structured error responses.

### Common Errors
1. **Missing Coin Parameter**:
   - Status Code: `400`
   - Response:
     ```json
     {
         "success": false,
         "statusCode": 400,
         "message": "Coin query parameter is required",
         "errors": []
     }
     ```

2. **Invalid Coin Parameter**:
   - Status Code: `400`
   - Response:
     ```json
     {
         "success": false,
         "statusCode": 400,
         "message": "Invalid coin parameter. Supported coins are 'bitcoin', 'matic-network', 'ethereum'.",
         "errors": []
     }
     ```



