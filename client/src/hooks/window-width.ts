import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const resizeHandler = debounce(() => {
    setWidth(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  return width;
};
