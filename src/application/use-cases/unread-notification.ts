import { NotificationNotFound } from '@utils/errors/notification-not-found';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface UnReadNotificationRequest {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = req;

    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
