import { ReactNode } from 'react';

type TCard = {
  children: ReactNode;
  [props: string]: any;
};

export default function Card({ children, ...props }: TCard) {
  return (
    <div
      className='mb-4 rounded-md bg-slate-800 p-4 hover:bg-slate-700'
      {...props}
    >
      {children}
    </div>
  );
}
