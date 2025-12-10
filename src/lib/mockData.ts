export interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: string;
  balances: {
    fiat: { KES: number; USD: number; UGX: number };
    crypto: { USDT: number; BTC: number; ETH: number };
  };
}

export interface Transaction {
  id: string;
  type: string;
  from: string;
  to: string;
  amount: number;
  status: "complete" | "pending";
  date: string;
  hash?: string;
  ref?: string;
}

export const mockUser: User = {
  id: "USR-001",
  name: "John Doe",
  email: "john@example.com",
  kycStatus: "verified",
  balances: {
    fiat: { KES: 125000, USD: 850, UGX: 450000 },
    crypto: { USDT: 1250, BTC: 0.045, ETH: 0.32 },
  },
};

export const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "crypto-to-fiat",
    from: "USDT",
    to: "KES",
    amount: 500,
    status: "complete",
    date: "2024-12-07",
    hash: "0x7a8b9c...4d5e6f",
  },
  {
    id: "TXN-002",
    type: "fiat-to-crypto",
    from: "USD",
    to: "BTC",
    amount: 200,
    status: "pending",
    date: "2024-12-07",
    ref: "REF-002",
  },
  {
    id: "TXN-003",
    type: "crypto-to-mobile",
    from: "USDT",
    to: "M-PESA",
    amount: 300,
    status: "complete",
    date: "2024-12-06",
    hash: "0x1a2b3c...7d8e9f",
  },
];

export const exchangeRates: Record<string, number> = {
  "USDT/KES": 155.5,
  "BTC/USD": 42350,
  "ETH/USD": 2245,
  "USD/KES": 150.25,
};

export const calculateCryptoBalance = (crypto: User["balances"]["crypto"]) => {
  return (crypto.USDT || 0) + (crypto.BTC || 0) * 42350 + (crypto.ETH || 0) * 2245;
};
