import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { DataBaseModule } from '../database/database.module';
import { SendNotification } from '@application/use-cases/send-notification';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
