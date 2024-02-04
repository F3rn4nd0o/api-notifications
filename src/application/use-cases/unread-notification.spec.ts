import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '@utils/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factories';
import { UnReadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unReadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when is does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotification(notificationRepository);

    expect(() => {
      return unReadNotification.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
