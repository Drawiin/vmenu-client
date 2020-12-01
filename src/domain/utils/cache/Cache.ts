const storage = typeof window !== 'undefined' ? localStorage : null

export function setValue<T>(key: string, value: T): void {
  storage?.setItem(key, JSON.stringify(value))
}

export function getValue<T>(key: string): T | null {
  const retrived = storage?.getItem(key)
  return JSON.parse(retrived)
}
