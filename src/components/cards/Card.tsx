import { ReactNode } from 'react';

type TCard = {
  children: ReactNode;
  [props: string]: any;
};

export default function Card({ children, ...props }: TCard) {
  return (
    <div className='mb-4 rounded-md bg-white p-4' {...props}>
      {children}
    </div>
  );
}
