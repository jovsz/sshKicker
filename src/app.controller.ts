import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './Guard/check_guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ssh/:key/:ip/:user')
  @UseGuards(AuthGuard)
  getHello(
    @Param('ip') ip: string,
    @Param('user') user: string,
  ) {
    return this.appService.kickSSh(ip, user)
  }
}
