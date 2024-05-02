import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from '../auth/decorators/public.decorator';
@Controller('upload')
export class UploadController {
  constructor() {}
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets', // 上传目录(基于根目录)
        filename: (req, file, cb) => {
          cb(null, file.originalname); // 保存的文件名
        },
      }),
    }),
  )
  // @Post('file')
  // uploadFile(@Body() body: UploadDto, @UploadedFile() file) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }
  @Public()
  @Post('file')
  uploadFile(@UploadedFile() file) {
    console.log(file);
    if (!file) {
      // 处理文件不存在的情况
    }
    const localUrl = `http://localhost:3000/uploads/${file.originalname}`; // 构建本地URL
    return {
      fileUrl: localUrl,
    };
  }
}
