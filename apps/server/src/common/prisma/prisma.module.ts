import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/** Global 装饰器表示就只需要在 app 中导入一次就能变成全局可用了，它 export 的 service 也会变成全局的 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
