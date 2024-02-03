import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factories';

describe('Count recipients notifications', () => {
  it('should be able to count a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '12AB' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '12AB' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '123ABC' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '12AB',
    });

    expect(count).toEqual(2);
  });
});
