import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectaService } from './directa/directa.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DirectaService],
})
export class AppModule {}
