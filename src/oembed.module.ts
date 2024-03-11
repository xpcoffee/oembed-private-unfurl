import { Module } from '@nestjs/common';
import { OembedController } from './oembed.controller';

@Module({
  imports: [],
  controllers: [OembedController],
  providers: [],
})
export class OEmbedModule {}
