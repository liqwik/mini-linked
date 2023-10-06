import { ReactNode } from "react";

type TCard = {
  children: ReactNode,
  [props: string]: any
}

export default function Card({ children, ...props }: TCard) {
  return <div className="bg-white rounded-md p-4 mb-2" {...props}>{children}</div>;
}
