import type { ImageData } from "./camera"

interface SensorType {
  id: number
  title: string
  description: string
  quantity: number
  image: ImageData
  type: string
  price: number
  discount: number
}

export type { SensorType }
