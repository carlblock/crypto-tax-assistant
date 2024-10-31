import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select.tsx'

const ExchangeSelector = ({
  onSelect,
}: {
  onSelect: (exchange: string) => void
}) => {
  // TODO: Later, refactor out this to a common place
  const EXCHANGES: Record<string, string> = {
    kraken: 'Kraken',
    coinbase: 'Coinbase (coming soon)',
    kucoin: 'Kucoin (coming soon)',
  }

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="sm:w-full md:max-w-[180px]">
        <SelectValue placeholder="Crypto Exchange" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(EXCHANGES).map(([key, value]) => (
          <SelectItem key={key} value={key} disabled={key !== 'kraken'}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default ExchangeSelector
