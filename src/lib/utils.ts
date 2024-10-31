import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatEUR = (amount: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(
    amount,
  )

export const formatCrypto = (amount: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format(amount)
