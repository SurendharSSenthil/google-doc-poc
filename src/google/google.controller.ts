import { Controller, Get, Post, Query, Param, Delete } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Google Docs')
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('auth-url')
  getAuthUrl() {
    return { url: this.googleService.getAuthUrl() };
  }

  @Get('callback')
  async saveToken(@Query('code') code: string) {
    return this.googleService.saveToken(code);
  }
}
