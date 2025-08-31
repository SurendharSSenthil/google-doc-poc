import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsModule } from './docs/docs.module';
// import { GoogleAuthService } from './google-auth.service';
import { GoogleModule } from './google/google.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
  imports: [DocsModule, GoogleModule, GoogleAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
