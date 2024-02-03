import { Content } from '@core/entities/content';
import { Notification, NotificationData } from '@core/entities/notification';

type Override = Partial<NotificationData>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('Solicitação de amizade'),
    recipientId: '12AB',
    ...override,
  });
}
