import Image from 'next/image';

type TLogo = {
  src: string;
  alt: string;
};

export default function BrandLogo({ src, alt }: TLogo) {
  return (
    <div className='block p-1'>
      <Image src={src || '/logo.svg'} alt={alt} width={48} height={48} />
    </div>
  );
}
