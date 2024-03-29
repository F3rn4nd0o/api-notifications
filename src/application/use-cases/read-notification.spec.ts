import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '@utils/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factories';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when is does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
