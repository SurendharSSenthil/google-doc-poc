import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { DocsService } from './docs.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('docs')
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get(':id')
  async readDoc(@Param('id') id: string) {
    return this.docsService.readDoc(id);
  }

  @Post(':id')
  async editDoc(@Param('id') id: string, @Body('text') text: string) {
    return this.docsService.editDoc(id, text);
  }

  @Delete(':id')
  async deleteDoc(@Param('id') id: string) {
    return this.docsService.deleteDoc(id);
  }
}
