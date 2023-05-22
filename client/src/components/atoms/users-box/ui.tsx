import { FC, PropsWithChildren } from 'react';

import './style.scss';

const UsersBox: FC<PropsWithChildren> = ({ children }) => <div className="box">{children}</div>;

export { UsersBox };
