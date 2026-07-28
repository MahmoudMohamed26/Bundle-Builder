import type { ImageData } from "./camera"

interface AccessoryType {
  id: number
  title: string
  description: string
  quantity: number
  image: ImageData
  type: string
  price: number
  discount: number
}

export type { AccessoryType }
