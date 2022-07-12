import { Crop } from 'react-image-crop'

export const loadCropInCanvas = (canvas: HTMLCanvasElement, image: HTMLImageElement, crop: Crop) => {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.min(Math.floor(crop.width * scaleX * pixelRatio), 512)
  canvas.height = Math.min(Math.floor(crop.height * scaleY * pixelRatio), 512)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY
  const sWidth = crop.width * scaleX
  const sHeight = crop.height * scaleY

  ctx.save()

  ctx.drawImage(image, cropX, cropY, sWidth, sHeight, 0, 0, canvas.width, canvas.height)

  ctx.restore()
}
