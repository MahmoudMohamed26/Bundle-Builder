interface ImageData {
  id: number
  url: any
}

interface ColorType {
  id: number
  title: string
  image: ImageData
}

interface CamerasVariationType {
  id: number
  quantity: number
  color: ColorType | null
}

interface CameraType {
  id: number
  title: string
  image: ImageData
  description: string
  variations: CamerasVariationType[]
  price: number
  discount: number
}

export type { ImageData, ColorType, CamerasVariationType, CameraType }
