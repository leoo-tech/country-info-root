import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
