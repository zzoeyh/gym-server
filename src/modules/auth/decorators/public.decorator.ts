import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * 用来跳过授权的自定义装饰器
 **/
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
