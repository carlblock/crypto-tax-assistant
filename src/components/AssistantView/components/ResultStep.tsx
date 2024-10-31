import { Check, PartyPopper } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import useAssistantContext from '@/components/AssistantView/hooks/UseAssistantContext'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import Kraken from '@/lib/analyzer/Kraken.ts'
import { AnalysisResult } from '@/lib/analyzer/types'
import { formatCrypto, formatEUR } from '@/lib/utils.ts'
import { ROUTES } from '@/constants/routes.ts'

const AfterTaxEarnings = ({
  afterTaxEarnings,
}: {
  afterTaxEarnings: number
}) => {
  return (
    <div className="flex">
      <dt className="w-48 font-semibold">Net After-Tax Earnings:</dt>
      <dd
        className={`flex items-center gap-1 font-semibold ${
          afterTaxEarnings > 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {formatEUR(afterTaxEarnings)}
        {afterTaxEarnings > 0 && <PartyPopper />}
      </dd>
    </div>
  )
}

const ResultStep = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [taxAnalysis, setTaxAnalysis] = useState<AnalysisResult | null>(null)
  const { activeStepIndex, setActiveStepIndex, transactions } =
    useAssistantContext()

  useEffect(() => {
    const analyzer = new Kraken(transactions)
    setTaxAnalysis(analyzer.getAnalysis())
  }, [transactions])

  return (
    <>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>This is your result</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {taxAnalysis && (
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Trading Activity</h3>
                  <dl className="space-y-1.5">
                    <div className="flex">
                      <dt className="w-48 font-medium">Total Trades:</dt>
                      <dd>{taxAnalysis.summary.totalTrades}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-48 font-medium">Total Transfers:</dt>
                      <dd>{taxAnalysis.summary.totalTransfers}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-48 font-medium">Total Gains:</dt>
                      <dd>{formatEUR(taxAnalysis.summary.totalGains)}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-48 font-medium">Total Fees:</dt>
                      <dd>{formatEUR(taxAnalysis.summary.totalFees)}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-48 font-medium">Estimated Tax:</dt>
                      <dd>{formatEUR(taxAnalysis.summary.estimatedTax)}</dd>
                    </div>
                    <AfterTaxEarnings
                      afterTaxEarnings={taxAnalysis.summary.afterTaxEarnings}
                    />
                  </dl>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Tax Declaration Information
                  </h3>
                  <ul className="space-y-1.5">
                    <li>Report in: Modelo 100</li>
                    <li>Section: Ganancias y Pérdidas Patrimoniales</li>
                    <li>Include each sale as separate entry</li>
                    <li>Use FIFO method for cost basis</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <h3 className="mt-6 font-semibold">Detailed transactions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>EUR Value</TableHead>
                <TableHead>Price/Unit</TableHead>
                <TableHead>Fee (EUR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxAnalysis &&
                taxAnalysis.trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>
                      {trade.date.toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>{trade.type}</TableCell>
                    <TableCell>{trade.asset}</TableCell>
                    <TableCell>{formatCrypto(trade.cryptoAmount)}</TableCell>
                    <TableCell>{formatEUR(trade.eurAmount)}</TableCell>
                    <TableCell>{formatEUR(trade.pricePerUnit)}</TableCell>
                    <TableCell>{formatEUR(trade.eurFee)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="mr-4"
          variant="secondary"
          onClick={() => setActiveStepIndex(activeStepIndex - 1)}
        >
          {t('cta.goBack')}
        </Button>
        <Button
          className="w-full md:w-auto"
          onClick={() => navigate(ROUTES.Home)}
        >
          <Check /> {t('cta.done')}
        </Button>
      </CardFooter>
    </>
  )
}

export default ResultStep
