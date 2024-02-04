import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factories';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get a notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: '12AB',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '12AB' }),
        expect.objectContaining({ recipientId: '12AB' }),
      ]),
    );
  });
});
