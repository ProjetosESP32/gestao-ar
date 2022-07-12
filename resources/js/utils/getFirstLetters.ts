export const getFirstLetters = (name: string) =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
