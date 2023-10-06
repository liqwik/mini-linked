import Image from 'next/image';
import { Inter } from 'next/font/google';
import Card from '@/components/Card';
import useTelegram from '@/context/useTelegram';
import { FormEvent } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { tgWebApp }: any = useTelegram();

  const handleUpdate = () => {
    tgWebApp.showAlert('Hello world');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(formData.toString());
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${inter.className} bg-gray-100`}
    >
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4'>
            <input className='w-full px-4 py-2 mr-2 rounded' name="search" placeholder='Search Jobs...' />
            <button className='bg-blue-700 text-white rounded px-4' type='submit'>Search</button>
          </div>
        </form>
        {/* <button className='bg-rose-600 p-2' onClick={handleUpdate}> */}
        {/*   Fire */}
        {/* </button> */}

        {[1, 2, 3, 4].map((item) => (
          <Card key={item.toString()}>
            <div className='flex flex-row content-center'>
              <div className='flex h-8 w-8 flex-col justify-center overflow-hidden rounded-md bg-gray-200'>
                <div className='block p-1'>
                  <Image src='/spotify.png' alt='Logo' width={36} height={36} />
                </div>
              </div>

              <div className='ml-4'>
                <p className='text-xs text-gray-600'>Spotify</p>
                <h3 className='font-semibold text-black'>
                  Full stack engineering
                </h3>

                <div className='container mt-1'>
                  <p className='text-xs text-gray-800'>
                    <span>Negotiate</span> - <span>Phnom Penh</span>
                  </p>

                  <div className='mt-1'>
                    <ul className='block'>
                      <li className='mr-1 inline-block rounded bg-blue-100 px-2 text-xs text-blue-600'>
                        Freelance
                      </li>
                      <li className='mr-2 inline-block rounded bg-rose-100 px-2 text-xs text-rose-600'>
                        Remote
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
