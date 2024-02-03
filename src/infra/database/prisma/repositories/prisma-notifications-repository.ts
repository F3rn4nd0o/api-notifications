import { NotificationsRepository } from '@/application/repositories/notifications-repository';
import { Notification } from '@/core/entities/notification';
import { PrismaService } from '../prisma.service';

export class PrismaNotificaitonsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createAt: notification.createdAt,
      },
    });
  }
}
