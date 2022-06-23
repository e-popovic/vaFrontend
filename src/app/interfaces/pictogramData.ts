export interface amountData {
  "positive_comments": number,
  "negative_comments": number
}

export interface pictogramData {
  "name": string,
  "amount": Array<amountData>
}
