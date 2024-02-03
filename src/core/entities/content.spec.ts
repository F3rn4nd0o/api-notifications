import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content whith less than 5 characters', () => {
    expect(() => new Content('123')).toThrow();
  });

  it('should not be able to create a notification content whith more than 248 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
