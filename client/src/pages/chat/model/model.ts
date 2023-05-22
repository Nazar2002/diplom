import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Socket } from 'socket.io-client';

import { Message, RoutesEnum, User } from '@common-types';

import { useAppSelector } from '@hooks';

type ChatProps = {
  socket: Socket;
};

const useChatProps = (socket: Socket) => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const user = useAppSelector((state) => state.authStore.user);

  useEffect(() => {
    socket.connect();

    socket.emit('join_room', { user: user, room: '1' });
  }, [user]);

  const handleSubmit = ({ text }: Message) => {
    socket.emit('send_message', text);

    console.log(text);
  };

  useEffect(() => {
    if (!socket.active) {
      navigate(RoutesEnum.SHOP);
    }

    socket.on('room', ({ users }) => {
      console.log(users);

      setUsers(users);
    });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    messages,

    user,

    users,

    handleSubmit
  };
};

export { useChatProps };

export type { ChatProps };
