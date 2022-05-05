import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = file.originalname
      const filePath = path.resolve(__dirname, '../static')

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'file upload error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
