import { Injectable } from '@nestjs/common';

type Resp = {
  message: string;
};

@Injectable()
export class AppService {
  getHello(): Resp {
    return { message: 'Hello World!' };
  }
}
