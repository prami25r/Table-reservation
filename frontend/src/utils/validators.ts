export const isEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value)
export const isPhone = (value: string) => /^[0-9]{10,15}$/.test(value)
export const isNotEmpty = (value: string) => value.trim().length > 0
