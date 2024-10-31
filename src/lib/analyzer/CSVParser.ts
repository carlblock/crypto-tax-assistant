import { Transaction } from '@/lib/analyzer/types'

class CSVParser {
  public static parse(csvContent: string): Transaction[] {
    const lines = csvContent.split('\n')
    const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim())

    return lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => {
        const values = line.split(',').map((v) => v.replace(/"/g, '').trim())
        return headers.reduce<Partial<Transaction>>((obj, header, index) => {
          // Type assertions for numeric fields
          if (header === 'amount' || header === 'fee' || header === 'balance') {
            obj[header as keyof Transaction] = parseFloat(values[index])
          } else {
            obj[header as keyof Transaction] = values[index]
          }
          return obj
        }, {}) as Transaction
      })
  }
}
export default CSVParser
