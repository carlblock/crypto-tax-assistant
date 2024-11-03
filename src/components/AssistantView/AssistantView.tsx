import { AssistantProvider } from '@/components/AssistantView/hooks/AssistantContext'
import StepCounter from '@/components/AssistantView/components/StepCounter'
import { Card, CardHeader } from '@/components/ui/Card'
import useAssistantContext from '@/components/AssistantView/hooks/UseAssistantContext'

const AssistantProviderSteps = () => {
  const { steps, activeStepIndex } = useAssistantContext()

  return (
    <Card className="m-6" data-testid="AssistantView:container">
      <CardHeader className="pb-0 pt-6">
        <StepCounter steps={steps} activeStepIndex={activeStepIndex} />
      </CardHeader>
      {steps.at(activeStepIndex)?.component || <p>No step</p>}
    </Card>
  )
}

const AssistantView = () => {
  return (
    <AssistantProvider>
      <AssistantProviderSteps />
    </AssistantProvider>
  )
}

export default AssistantView
