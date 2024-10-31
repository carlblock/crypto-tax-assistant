import { useContext } from 'react'
import { AssistantContext } from './AssistantContext.tsx'

const useAssistantContext = () => {
  const context = useContext(AssistantContext)
  if (!context)
    throw Error('useAssistantContext can only be used inside an AuthProvider')
  return context
}
export default useAssistantContext
