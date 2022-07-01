export const convertPotencyToNumber = <T extends { potency: string }>(consumptionData: T[]) =>
  consumptionData.map(({ potency, ...consumption }) => ({ potency: Number(potency), ...consumption }))
