import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import fs from 'node:fs'
import type { ICriminal } from './types/Criminal.ts'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

    @Get('red-blue')
@Render('red-blue')
    getRedBlue() {
        return {bgColor: Math.random() > 0.5 ? 'red' : 'blue'};

}
    @Get('wanted')
    @Render('wanted')
    getWanted() {
        return JSON.parse(fs.readFileSync('wanted.json', {encoding: 'utf-8'}))
}
    @Get('search')
    @Render('search')
    searchCrime(@Query('search') crime: string) {
        crime = crime.toLocaleLowerCase();
        return {results: (JSON.parse(fs.readFileSync('wanted.json', {encoding: 'utf-8'})) as ICriminal).crimes.filter(it=>!crime || it.toLocaleLowerCase()===crime)};
}
    @Get('color-picker')
    @Render('color-picker')
    getColorPicker(@Query('color') color: string) {
        return {textColor: color ?? '#FFFFFF'};


}
    @Get('quadratic')
    @Render('quadratic')
    getQuadratic(@Query('a')a: string,@Query('b')b: string,@Query('c')c: string) {
        return {a: +a, b: +b, c: +c}

}
}
