const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SPECIAL_CHARACTERS = '!@#$%^&*()_+~`|}{[]:;?><,./-='

export const generatePassword = (length: number) => {
  const password: string[] = []

  password.push(...LOWER_CASE_LETTERS)
  password.push(...UPPER_CASE_LETTERS)
  password.push(...NUMBERS)
  password.push(...SPECIAL_CHARACTERS)

  return password
    .sort(() => Math.random() - 0.5)
    .slice(0, length)
    .join('')
}
