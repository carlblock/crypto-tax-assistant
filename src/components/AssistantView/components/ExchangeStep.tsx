import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card.tsx'
import ExchangeSelector from '@/components/AssistantView/components/ExchangeSelector.tsx'
import { Button } from '@/components/ui/Button.tsx'
import useAssistantContext from '@/components/AssistantView/hooks/UseAssistantContext.tsx'

const ExchangeStep = () => {
  const { t } = useTranslation()
  const { exchange, setExchange, activeStepIndex, setActiveStepIndex } =
    useAssistantContext()

  const onSelectExchange = (exchange: string) => {
    setExchange(exchange)
  }
  return (
    <>
      <CardHeader>
        <CardTitle>{t('assistant.exchange.title')}</CardTitle>
        <CardDescription>{t('assistant.exchange.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ExchangeSelector onSelect={onSelectExchange} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="w-full md:w-auto"
          onClick={() => setActiveStepIndex(activeStepIndex + 1)}
          disabled={!exchange}
          data-testid="ExchangeStep:button_continue"
        >
          <Check /> {t('cta.continue')}
        </Button>
      </CardFooter>
    </>
  )
}

export default ExchangeStep
