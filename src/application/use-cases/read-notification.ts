import { NotificationNotFound } from '@utils/errors/notification-not-found';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = req;

    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
