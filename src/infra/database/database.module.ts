import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificaitonsRepository } from './prisma/repositories/prisma-notifications-repository';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificaitonsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DataBaseModule {}
