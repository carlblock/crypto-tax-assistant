import {
  ArrowRight,
  Calendar,
  Check,
  ExternalLink,
  FileDown,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import useAssistantContext from '@/components/AssistantView/hooks/UseAssistantContext'

const CSVExportStep = () => {
  const { activeStepIndex, setActiveStepIndex } = useAssistantContext()
  const { t } = useTranslation()
  return (
    <>
      <CardHeader>
        <CardTitle>Export transactions</CardTitle>
        <CardDescription>
          In this step you&#39;ll need to login to Kraken dashboard and export
          transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div data-testid="CSVExportStep:instructions">
          <ol className="space-y-6">
            <li className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium">Access Your Kraken Dashboard</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Log in to your Kraken account and navigate to the main
                  dashboard
                  <ExternalLink className="mb-1 ml-1 inline-block h-4 w-4" />
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium">Find Transaction History</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Go to &#34;Transactions&#34;
                  <ArrowRight className="mx-1 inline-block h-4 w-4" /> And
                  Select &#34;History&#34; in the tab navigation
                </p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium">Select Date Range</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Choose the complete tax year you need to declare (January 1st
                  - December 31st)
                  <Calendar className="ml-2 inline-block h-4 w-4" />
                </p>
                <div className="mt-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
                  <strong>Tip:</strong> Make sure to include the entire year to
                  ensure all transactions are captured for your tax declaration
                </div>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                4
              </div>
              <div className="flex-1">
                <p className="font-medium">Download Your Transaction History</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Click &#34;Export&#34; and then choose the CSV file option
                  <FileDown className="ml-2 inline-block h-4 w-4" />
                </p>
                <div className="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                  <strong>Note:</strong> The export might take a few minutes to
                  generate depending on your transaction volume
                </div>
              </div>
            </li>
          </ol>
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
          onClick={() => setActiveStepIndex(activeStepIndex + 1)}
          data-testid="CSVExportStep:button_continue"
        >
          <Check /> {t('cta.continue')}
        </Button>
      </CardFooter>
    </>
  )
}
export default CSVExportStep
