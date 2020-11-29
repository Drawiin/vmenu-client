export function currencyConvertion(amount: number): string {
  return new Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL'
  })
    .format(amount)
    .replace('.', ',')
}
