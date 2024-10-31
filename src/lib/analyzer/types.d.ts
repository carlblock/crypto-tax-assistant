export interface Transaction {
  txid: string
  refid: string
  time: string
  type: 'trade' | 'transfer'
  subtype: string
  aclass: string
  asset: string
  wallet: string
  amount: number
  fee: number
  balance: number
}

export interface Trade {
  id: string
  date: Date
  type: 'Buy' | 'Sell'
  asset: string
  cryptoAmount: number
  eurAmount: number
  eurFee: number
  pricePerUnit: number
}

export interface TaxSummary {
  totalTrades: number
  totalTransfers: number
  totalGains: number
  totalFees: number
  estimatedTax: number
  afterTaxEarnings: number
}

export interface AnalysisResult {
  trades: Trade[]
  transfers: Transaction[]
  summary: TaxSummary
}

// Tax bracket type
export type TaxBracket = {
  threshold: number
  rate: number
}
