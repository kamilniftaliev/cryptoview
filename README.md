# CryptoView

## Crypto Trading Platform

This is a simple MERN stack application that displays current prices of cryptocurrencies and allows users to trade them.

**Features:**

- **Real-time Cryptocurrency Prices:** Retrieves and displays the latest prices from a trusted cryptocurrency API.
- **Trading Functionality:** Allows users to buy and sell cryptocurrencies.
- **Secure Authentication:** Uses JWT authentication to protect user accounts.
- **User Dashboard:** Displays trading history, portfolio, and other relevant information.

### API Screenshots

#### 1. NFT Metadata Retrieval and Storage

<img width="600" alt="image" src="https://github.com/user-attachments/assets/f44eeba0-0655-441d-a35f-a4ed57058cfb">

#### 2. Simple Cryptocurrency Transaction Tracking

<img width="600" alt="image" src="https://github.com/user-attachments/assets/93753335-034a-4cc4-8446-676eb0b6eb11">

#### 3. Decentralized Storage (IPFS Integration)

##### 3.1. Storing a text

<img width="600" alt="image" src="https://github.com/user-attachments/assets/f255966d-4d0b-4a6b-a2e6-fdf72144e81a">

##### 3.2. Retrieving a text by hash

<img width="600" alt="image" src="https://github.com/user-attachments/assets/33e039c6-14e3-4e3b-8992-d8da63ee7041">

#### 4. Token Balance Lookup

<img width="600" alt="image" src="https://github.com/user-attachments/assets/540d95e3-2396-4fab-9eec-7917c26de3a1">

#### 5. Basic Smart Contract Interaction

<img width="600" alt="image" src="https://github.com/user-attachments/assets/540d95e3-2396-4fab-9eec-7917c26de3a1">

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:kamilniftaliev/cryptoview.git
   ```

2. **Install Dependencies:**

   ```bash
   cd cryptoview
   npm install
   ```

3. **Set up Environment Variables:**

   - Create a `.env` file from `.env.example` file at the root of the project.
   - Add necessary environment variables from these services: `ETHERSCAN`, `MORALIS`, `INFURA`

4. **Start the Server:**

   ```bash
   npm start
   ```

5. **Test the API:**
   Go to Postman and send some requests to `http://localhost:5005`.

**Project Structure:**

```
crypto-trading-platform/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── public/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

**Technologies Used:**

- **Frontend:** React, Redux, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT
- **API:** [Cryptocurrency API](https://example.com/api)

**Contributing:**

Contributions are welcome! Please create a pull request with your changes.

**License:**

This project is licensed under the MIT License.
