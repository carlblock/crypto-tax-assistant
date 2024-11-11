import { type JSX } from 'react'

const CardInfo = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: JSX.Element
}) => {
  return (
    <div className="CardInfo flex flex-col items-center rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mb-4 h-10 w-10 text-blue-500">{icon}</div>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default CardInfo
