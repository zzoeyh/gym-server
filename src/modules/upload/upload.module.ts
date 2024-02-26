import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  // providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'assets'), // 指定静态文件的根目录
      serveRoot: '/uploads', // 指定URL的根路径 -> 访问url/uploads/filename
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
