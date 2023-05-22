import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren & {
  selectedKey: string;

  hasLoad?: boolean;
};

export type { LayoutProps };
