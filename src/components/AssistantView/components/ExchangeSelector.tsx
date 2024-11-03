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
      <SelectTrigger
        className="sm:w-full md:max-w-[180px]"
        data-testid="ExchangeSelect:trigger_main"
      >
        <SelectValue
          placeholder="Crypto Exchange"
          data-testid="ExchangeSelect:value_display"
        />
      </SelectTrigger>
      <SelectContent data-testid="ExchangeSelect:content_options">
        {Object.entries(EXCHANGES).map(([key, value]) => (
          <SelectItem
            key={key}
            value={key}
            disabled={key !== 'kraken'}
            data-testid={`ExchangeSelect:option_${key}`}
          >
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default ExchangeSelector
