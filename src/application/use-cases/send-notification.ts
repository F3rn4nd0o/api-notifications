import { Notification } from '@core/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { Content } from '@core/entities/content';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = req;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
