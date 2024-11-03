import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useCallback, useState } from 'react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import useAssistantContext from '@/components/AssistantView/hooks/UseAssistantContext'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import CSVParser from '@/lib/analyzer/CSVParser.ts'

const CSVProcessStep = () => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const { setActiveStepIndex, activeStepIndex, setTransactions } =
    useAssistantContext()

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        setFile(file)
      }
    }
  }
  const processCSV = useCallback(async () => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    const result = await new Promise((resolve, reject) => {
      reader.onload = (evt) => resolve(evt.target?.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
    const transactions = CSVParser.parse(result as string)
    if (transactions) {
      setTransactions(transactions)
    }
  }, [file, setTransactions])

  const onClickContinue = async () => {
    await processCSV()
    setActiveStepIndex(activeStepIndex + 1)
  }
  return (
    <>
      <CardHeader>
        <CardTitle>Upload Your Kraken Transaction History</CardTitle>
        <CardDescription>
          Your CSV file is processed entirely in your browser and never leaves
          your device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="csvFile">Click to browse your file</Label>
            <Input
              id="csvFile"
              type="file"
              accept="text/csv, .csv"
              onChange={onChangeFile}
              data-testid="CSVProcessStep:input_file"
            />
          </div>
          <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-slate-400">
            <p className="font-medium">File Requirements:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Must be a CSV file exported from Kraken</li>
              <li>
                Should contain your complete transaction history for the tax
                year
              </li>
            </ul>
          </div>
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
          onClick={onClickContinue}
          disabled={!file}
          data-testid="CSVProcessStep:button_continue"
        >
          <Check /> {t('cta.continue')}
        </Button>
      </CardFooter>
    </>
  )
}

export default CSVProcessStep
