import {
  AnalysisResult,
  TaxBracket,
  Trade,
  Transaction,
} from '@/lib/analyzer/types'

class Kraken {
  private transactions: Transaction[]

  private readonly tradePairs: Record<string, Transaction[]>

  private readonly transfers: Transaction[]

  private trades: Trade[]

  // Spanish tax brackets
  private static readonly TAX_BRACKETS: TaxBracket[] = [
    { threshold: 6000, rate: 0.19 },
    { threshold: 50000, rate: 0.21 },
    { threshold: 200000, rate: 0.23 },
    { threshold: Infinity, rate: 0.26 },
  ]

  constructor(transactions: Transaction[]) {
    this.transactions = transactions
    this.tradePairs = {}
    this.transfers = []
    this.trades = []
    this.processTransactions()
  }

  private processTransactions(): void {
    // Group trades by refid
    this.transactions.forEach((tx) => {
      if (tx.type === 'trade') {
        if (!this.tradePairs[tx.refid]) {
          this.tradePairs[tx.refid] = []
        }
        this.tradePairs[tx.refid].push(tx)
      } else if (tx.type === 'transfer') {
        this.transfers.push(tx)
      }
    })

    // Process trade pairs
    this.trades = Object.values(this.tradePairs)
      .map((pair) => this.processTradesPair(pair))
      .filter((trade): trade is Trade => trade !== null)
  }

  private processTradesPair(pair: Transaction[]): Trade | null {
    const eurTx = pair.find((tx) => tx.asset === 'EUR')
    const cryptoTx = pair.find((tx) => tx.asset !== 'EUR')

    if (!eurTx || !cryptoTx) return null

    const isSell = cryptoTx.amount < 0

    return {
      id: cryptoTx.txid,
      date: new Date(cryptoTx.time),
      type: isSell ? 'Sell' : 'Buy',
      asset: cryptoTx.asset,
      cryptoAmount: Math.abs(cryptoTx.amount),
      eurAmount: Math.abs(eurTx.amount),
      eurFee: eurTx.fee,
      pricePerUnit: Math.abs(eurTx.amount / cryptoTx.amount),
    }
  }

  private calculateTaxAmount(gains: number): number {
    let remainingGains = gains
    let totalTax = 0
    let previousThreshold = 0

    for (const bracket of Kraken.TAX_BRACKETS) {
      const taxableInBracket = Math.min(
        Math.max(remainingGains, 0),
        bracket.threshold - previousThreshold,
      )

      totalTax += taxableInBracket * bracket.rate
      remainingGains -= taxableInBracket
      previousThreshold = bracket.threshold

      if (remainingGains <= 0) break
    }

    return totalTax
  }

  private getTaxableSales(): Trade[] {
    return this.trades.filter((trade) => trade.type === 'Sell')
  }

  public getAnalysis(): AnalysisResult {
    const taxableEvents = this.getTaxableSales()
    const totalGains = taxableEvents.reduce(
      (sum, trade) => sum + trade.eurAmount,
      0,
    )
    const estimatedTax = this.calculateTaxAmount(totalGains)
    const totalFees = this.trades.reduce((sum, trade) => sum + trade.eurFee, 0)
    const afterTaxEarnings = totalGains - estimatedTax - totalFees

    return {
      trades: this.trades,
      transfers: this.transfers,
      summary: {
        totalTrades: this.trades.length,
        totalTransfers: this.transfers.length,
        totalGains,
        totalFees,
        estimatedTax: this.calculateTaxAmount(totalGains),
        afterTaxEarnings,
      },
    }
  }
}

export default Kraken
