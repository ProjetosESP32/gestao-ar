import { Button, Modal, Typography, Box, Paper } from '@mui/material'
import React, { ChangeEventHandler, FC, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import { useDebounceEffect } from '../../hooks/useDebounceEffect'
import { loadCropInCanvas } from './loadCropInCanvas'

interface CropperProps {
  onChange: (imageBlob: Blob) => void
}

const Cropper: FC<CropperProps> = ({ onChange }) => {
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
    console.log('image select')
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
      canvasRef.current?.toBlob(blob => {
        if (blob) {
          onChange(blob)
          setFilePreview(null)
        }
      })
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
          hidden
          accept='image/png,image/jpeg'
          onChange={handleImageSelect}
        />
        <Typography variant='h6'>Selecione uma imagem</Typography>
      </label>
      <Modal
        open={!!filePreview}
        onClose={reset}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={2} gap={2}>
            <Typography variant='h6'>Selecione a área da imagem para salvar</Typography>
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
                style={{ maxHeight: '60vh', maxWidth: '60vw' }}
              />
            </ReactCrop>
            <canvas ref={canvasRef} hidden></canvas>
            <Button disabled={!completedCrop} onClick={handleOk} variant='contained'>
              OK
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}

export default Cropper
