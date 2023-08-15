import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { DirectaService } from './directa/directa.service';
import { DirectaTradingCommands } from './directa/directa.enums';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly directa: DirectaService
  ) { }

  @Get()
  @Render('index')
  root() {
    this.directa.sendTradingCommand(DirectaTradingCommands.INFOAVAILABILITY)
    this.directa.sendTradingCommand(DirectaTradingCommands.INFOSTOCKS)

    return { message: 'Hello world!' };
  }
}
