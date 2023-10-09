import { PropsWithChildren } from 'react';

type TTitle = {} & PropsWithChildren;

export default function Title({ children }: TTitle) {
  return <h3 className='text-sm font-semibold text-slate-200'>{children}</h3>;
}
