import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

type Resp = {
  message: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Resp {
    return this.appService.getHello();
  }

  @Get('something')
  getSomething(): Resp {
    return { message: 'Sommething' };
  }
}
