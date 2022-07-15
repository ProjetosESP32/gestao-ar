import { Crop } from 'react-image-crop'

export const CANVAS_SIZE = 256

export const loadCropInCanvas = (canvas: HTMLCanvasElement, image: HTMLImageElement, crop: Crop) => {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const sWidth = crop.width * scaleX
  const sHeight = crop.height * scaleY

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(image, cropX, cropY, sWidth, sHeight, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
}
