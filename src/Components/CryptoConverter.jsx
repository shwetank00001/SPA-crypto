import React, { useEffect, useState } from 'react'

const coinMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  XRP: 'ripple',
  BNB: 'binancecoin',
  SOL: 'solana',
  USDC: 'usd-coin',
  TRX: 'tron',
  DOGE: 'dogecoin',
  ADA: 'cardano',
  BCH: 'bitcoin-cash',
  SUI: 'sui',
  WBT: 'whitebit',
  LINK: 'chainlink',
  AVAX: 'avalanche-2',
  XLM: 'stellar',
  TON: 'toncoin',
  SHIB: 'shiba-inu',
  LTC: 'litecoin',
  HBAR: 'hedera-hashgraph',
  XMR: 'monero',
  DAI: 'dai',
  DOT: 'polkadot',
  OKB: 'okb',
  UNI: 'uniswap',
  AAVE: 'aave',
  PEPE: 'pepe',
  APT: 'aptos',
  LDO: 'lido-dao',
  GNO: 'gnosis',
  SAND: 'the-sandbox',
  DEXE: 'dexe',
  SEI: 'sei-network',
  JASMY: 'jasmycoin',
  JUP: 'jupiter-exchange-solana',
  BTT: 'bittorrent',
  ZEC: 'zcash',
  RAY: 'raydium',
  MANA: 'decentraland',
  NEO: 'neo',
  GALA: 'gala',
  CORE: 'coredaoorg',
  XTZ: 'tezos',
  XCN: 'chain-2',
  TUSD: 'true-usd',
  BSV: 'bitcoin-cash-sv',
  MATIC: 'matic-network',
  MGC: 'magic',
  APE: 'apecoin',
  NFT: 'nft',
  MIOTA: 'iota',
  KAVA: 'kava'
}

const CryptoConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [amount, setAmount] = useState(1);
  const [cryptoData, setCryptoData] = useState({});
  
  const ids = Object.values(coinMap).join(',');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,inr`
      );
      const data = await res.json();
      setCryptoData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Crypto Converter</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-32"
        />
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="border p-2"
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(coinMap).map(([symbol, id]) => {
          const price = cryptoData[id]?.[selectedCurrency];
          return (
            <div key={symbol} className="border p-2 rounded shadow">
              <h2 className="font-semibold">{symbol}</h2>
              <p>
                {price ? `${(amount / price).toFixed(6)} ${symbol}` : 'Loading...'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoConverter;
