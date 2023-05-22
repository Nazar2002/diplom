import { FC } from 'react';

import { UsersBox } from '@components/atoms';

import { ChatFooter, MessageItem } from '@components/molecules';

import { ChatProps, useChatProps } from '../model';

import { LayoutView } from '@components/templates';

import './style.scss';

const Chat: FC<ChatProps> = ({ socket }) => {
  const { messages, user, users, handleSubmit } = useChatProps(socket);

  return (
    <LayoutView selectedKey="5">
      <div className="chat">
        <div className="users">
          <h1 className="title">Користувачі онлайн</h1>

          <div className="user-list">
            {users.map((item) => (
              <h4 key={item.id} className="user-item">
                {item.email}
              </h4>
            ))}
          </div>
        </div>

        <div className="chat-box">
          <UsersBox>
            {messages?.map((item, index) => (
              <MessageItem key={index} message={item} currentUser={user} />
            ))}
          </UsersBox>

          <ChatFooter handleSubmit={handleSubmit} />
        </div>
      </div>
    </LayoutView>
  );
};

export { Chat };
