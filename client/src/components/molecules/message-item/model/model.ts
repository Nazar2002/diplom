import { Message, User } from '@common-types';

type MessageItemProps = {
  message: Message;

  currentUser: User | null;
};

export type { MessageItemProps };
