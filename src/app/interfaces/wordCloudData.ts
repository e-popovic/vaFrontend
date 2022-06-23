export interface posnegCloudData {
  "text": string,
  "weight": number
}

export interface wordCloudData {
  "name": string,
  "positive": Array<posnegCloudData>,
  "negative": Array<posnegCloudData>
}
