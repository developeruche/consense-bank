import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IChildren {
  children: ReactNode;
}


interface IPortal extends IChildren {
  target: string;
}

const Portal = ({ children, target }: IPortal) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector(target) as HTMLElement)
    : null;
};

export { Portal as default };
