import { createContext, ReactNode, useMemo, useState } from 'react'
import ExchangeStep from '@/components/AssistantView/components/ExchangeStep'
import CSVExportStep from '@/components/AssistantView/components/CSVExportStep'
import { Step } from '@/components/AssistantView/types/steps'
import CSVProcessStep from '@/components/AssistantView/components/CSVProcessStep.tsx'
import ResultStep from '../components/ResultStep'

interface AssistantContextValue {
  exchange: string | null
  setExchange: (exchange: string) => void
  steps: Step[]
  setActiveStepIndex: (index: number) => void
  activeStepIndex: number
  transactions: any
  setTransactions: (setTransactions: any) => void
}
const AssistantContext = createContext<AssistantContextValue | null>(null)

const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [exchange, setExchange] = useState<string | null>(null)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const [transactions, setTransactions] = useState<any>(null)
  const steps = useMemo(
    () => [
      { name: 'Exchange', component: <ExchangeStep /> },
      { name: 'CSV Export', component: <CSVExportStep /> },
      { name: 'CSV Process', component: <CSVProcessStep /> },
      { name: 'Result', component: <ResultStep /> },
    ],
    [],
  )
  const contextValue = useMemo(
    () => ({
      activeStepIndex,
      exchange,
      setActiveStepIndex,
      setExchange,
      setTransactions,
      steps,
      transactions,
    }),
    [exchange, activeStepIndex, transactions, steps],
  )

  return (
    <AssistantContext.Provider value={contextValue}>
      {children}
    </AssistantContext.Provider>
  )
}

export { AssistantContext, AssistantProvider }
