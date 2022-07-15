import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { ChangeEventHandler, FC, ReactNode, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import { CANVAS_SIZE, loadCropInCanvas } from './loadCropInCanvas'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'

interface CropperProps {
  onChange: (imageBlob: Blob) => void
  disabled?: boolean
  children: ReactNode
}

export const Cropper: FC<CropperProps> = ({ onChange, disabled = false, children }) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop>()
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const reset = () => {
    setCrop(undefined)
    setCompletedCrop(undefined)
    setFilePreview(null)
  }

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.item(0)

    if (file) {
      setCrop(undefined)
      const reader = new FileReader()

      reader.onload = e => {
        setFilePreview(e.target?.result?.toString() || null)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleOk = () => {
    if (completedCrop) {
      canvasRef.current?.toBlob(
        blob => {
          if (blob) {
            onChange(blob)
            setFilePreview(null)
          }
        },
        'image/jpeg',
        0.75,
      )
    }
  }

  useDebounceEffect(
    () => {
      if (completedCrop?.width && completedCrop?.height && imageRef.current && canvasRef.current) {
        loadCropInCanvas(canvasRef.current, imageRef.current, completedCrop)
      }
    },
    100,
    [completedCrop],
  )

  return (
    <>
      <label htmlFor='image-file'>
        <input
          type='file'
          name='image-file'
          id='image-file'
          accept='image/*'
          hidden
          onChange={handleImageSelect}
          disabled={disabled}
        />
        {children}
      </label>
      <Modal
        open={!!filePreview}
        onClose={reset}
        sx={{ width: '100vw', height: '100vh', maxHeight: '100vh', display: 'grid', placeItems: 'center', padding: 2 }}
      >
        <Paper>
          <Stack alignItems='center' p={2} spacing={2} maxWidth='90vw' maxHeight='80vh'>
            <Typography variant='h6' textAlign='center'>
              Selecione a área da imagem para salvar
            </Typography>
            <ReactCrop
              crop={crop}
              onChange={(_: unknown, percentCrop: Crop) => setCrop(percentCrop)}
              onComplete={(crop: Crop) => setCompletedCrop(crop)}
              aspect={1}
            >
              <img
                src={filePreview!}
                alt='Imagem selecionada'
                ref={imageRef}
                style={{ maxHeight: '60vh', maxWidth: '100%' }}
              />
            </ReactCrop>
            <Button disabled={!completedCrop} onClick={handleOk}>
              OK
            </Button>
          </Stack>
        </Paper>
      </Modal>
      <canvas ref={canvasRef} hidden width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
    </>
  )
}
