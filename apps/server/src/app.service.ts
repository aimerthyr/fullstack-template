import { Injectable } from '@nestjs/common';
import { NAME } from '@internal/constants/index';

@Injectable()
export class AppService {
  getHello = (): string => `The meaning of life is: ${NAME}`;
}
