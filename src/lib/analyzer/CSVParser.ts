import { parse } from 'csv-parse/browser/esm/sync'
import type { Options } from 'csv-parse'

interface Transaction {
  txid: string
  refid: string
  time: string
  type: string
  subtype: string
  aclass: string
  asset: string
  wallet: string
  amount: number
  fee: number
  balance: number
}
class CSVParser {
  private static readonly parserOptions: Options = {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: true,
    bom: true,
    cast_date: false,
  }

  public static parse(csvContent: string): Transaction[] {
    try {
      const records = parse(csvContent, this.parserOptions)

      return records.map((record: any, index: number) => {
        // Cast numeric fields manually
        const parsedRecord = {
          ...record,
          amount: parseFloat(record.amount),
          fee: parseFloat(record.fee),
          balance: parseFloat(record.balance),
        }

        // Validate required fields
        const requiredFields = [
          'txid',
          'refid',
          'time',
          'type',
          'amount',
          'fee',
          'balance',
        ]
        for (const field of requiredFields) {
          if (!(field in parsedRecord)) {
            throw new Error(
              `Missing required field "${field}" at row ${index + 1}`,
            )
          }
        }

        // Validate numeric fields
        for (const field of ['amount', 'fee', 'balance']) {
          if (isNaN(parsedRecord[field])) {
            throw new Error(
              `Invalid number format for "${field}" at row ${index + 1}`,
            )
          }
        }

        // Validate date format
        if (!parsedRecord.time.match(/^\d{4}-\d{2}-\d{2}/)) {
          throw new Error(`Invalid date format at row ${index + 1}`)
        }

        return parsedRecord as Transaction
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`CSV parsing error: ${error.message}`)
      }
      throw error
    }
  }
}

export default CSVParser
