import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Drive from '@ioc:Adonis/Core/Drive'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import axios from 'axios'
import { USER_COVER_FOLDER } from 'App/Models/User'

export const getAttachment = async (url: string) => {
  const filename = cuid()

  const response = await axios.get(url, { responseType: 'stream' })

  const { 'content-type': contentType, 'content-length': contentLength } = response.headers
  const [, extname] = contentType.split('/')

  const coverImage = new Attachment({
    extname,
    mimeType: contentType,
    size: Number(contentLength),
    name: `${USER_COVER_FOLDER}/${filename}.${extname}`,
  })

  coverImage.isPersisted = true

  await Drive.putStream(coverImage.name, response.data)

  return coverImage
}
