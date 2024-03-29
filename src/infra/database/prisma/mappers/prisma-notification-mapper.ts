import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@core/entities/notification';
import { Content } from '@core/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.cancelAt,
        createdAt: raw.createAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
