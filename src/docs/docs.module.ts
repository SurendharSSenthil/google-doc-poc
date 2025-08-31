import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { GoogleAuthModule } from 'src/google-auth/google-auth.module';

@Module({
  imports: [GoogleAuthModule],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
