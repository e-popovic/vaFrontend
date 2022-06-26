export interface posnegCloudData {
  "text": string,
  "weight": number
  "color": string
}

export interface wordCloudData {
  "name": string,
  "positive": Array<posnegCloudData>,
  "negative": Array<posnegCloudData>
}
