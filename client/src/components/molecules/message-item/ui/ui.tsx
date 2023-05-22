import { FC } from 'react';

import { Comment } from 'antd';

import { MessageItemProps } from '../model';

import './style.scss';

const MessageItem: FC<MessageItemProps> = ({ message, currentUser }) => {
  const myMessage = currentUser?.email === message.user;

  return (
    <div className={myMessage ? 'message-my' : 'message'}>
      <Comment content={message.text} author={message.user} className="comment" />
    </div>
  );
};

export { MessageItem };
