import { ApiProperty } from '@nestjs/swagger';

export class WatchDocDto {
  @ApiProperty({
    example: '1abcDXYZ...',
    description: 'Google Doc/Drive file ID',
  })
  fileId: string;

  @ApiProperty({
    example: 'https://random123.ngrok.io/docs/notifications',
    description: 'Webhook endpoint URL where notifications will be sent',
  })
  webhookUrl: string;
}
