import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Headers,
  Req,
} from '@nestjs/common';
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

  @Post('watch')
  async watchFile(
    @Body('fileId') fileId: string,
    @Body('webhookUrl') webhookUrl: string,
  ) {
    return this.docsService.watchFile(fileId, webhookUrl);
  }

  // Webhook endpoint to receive notifications
  @Post('notifications')
  async handleNotification(@Headers() headers: any, @Req() req: any) {
    console.log('📩 Received notification: ', headers);
    // headers['x-goog-resource-id'] -> file identifier
    // headers['x-goog-changed'] -> what changed
    return { received: true };
  }
}
