import { PropsWithChildren } from 'react';

type TDescription = {} & PropsWithChildren;

export default function Description({ children }: TDescription) {
  return <p className='text-xs text-slate-600'>{children}</p>;
}
