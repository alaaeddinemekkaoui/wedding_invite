export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>

/**
 * Lightweight utility to merge class names (no external dependency required).
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const arg of inputs) {
    if (!arg) continue
    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (typeof arg === 'number') {
      classes.push(String(arg))
    } else if (Array.isArray(arg)) {
      const inner = cn(...arg)
      if (inner) classes.push(inner)
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}
