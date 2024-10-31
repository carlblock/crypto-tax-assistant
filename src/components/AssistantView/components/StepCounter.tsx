import { Step } from '@/components/AssistantView/types/steps'

/**
 * TODO: Maybe I can make this one a bit more generic and put in general components later
 */
const StepCounter = ({
  steps,
  activeStepIndex,
}: {
  steps: Step[]
  activeStepIndex: number
}) => {
  return (
    <div>
      <ul className="flex gap-1">
        {steps.map((step, i) => {
          return (
            <li
              key={step.name}
              className={`block h-1 w-12 rounded-full ${
                i <= activeStepIndex ? 'bg-blue-600' : 'bg-blue-100'
              }`}
              aria-label={step.name}
            />
          )
        })}
      </ul>
    </div>
  )
}
export default StepCounter
