import Image from 'next/image';
import Card from '@/components/Card';
import useTelegram from '@/context/useTelegram';
import { FormEvent } from 'react';

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
      className={`flex min-h-screen flex-col items-center justify-between p-4 bg-gray-100`}
    >
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='flex mb-4'>
            <input className='w-full px-4 py-2 mr-2 rounded' name="search" placeholder='Search Jobs...' />
            <button className='bg-blue-700 text-white rounded px-4' type='submit'>Search</button>
          </div>
        </form>

        {[1, 2, 3, 4].map((item) => (
          <Card key={item.toString()}>
            <div className='container'>
              <div className='container flex flex-row content-center mb-2'>
                <div className='flex h-10 w-10 flex-col justify-center overflow-hidden rounded-md bg-gray-200'>
                  <div className='block p-1'>
                    <Image src='/spotify.png' alt='Logo' width={48} height={48} />
                  </div>
                </div>

                <div className='ml-4'>
                  <h3 className='font-semibold text-sm text-black'>
                    Full stack engineering
                  </h3>

                  <p className='text-xs text-neutral-500'>
                    <span>Spotify</span> - <span>Phnom Penh</span>
                  </p>
                </div>
              </div>

              <div className='container mb-4'>
                <ul className='flex flex-row'>
                  <li className='mr-1 rounded-sm bg-blue-100 px-2 text-xs text-blue-600'>
                    Freelance
                  </li>
                  <li className='mr-1 rounded-sm bg-blue-100 px-2 text-xs text-blue-600'>
                    Remote
                  </li>
                </ul>
              </div>

              <div className='container'>
                <div className='flex flex-row justify-between'>
                  <p className='text-xs text-neutral-500'>2 hours ago</p>
                  <p className='text-xs'>
                    <strong className='text-sm'>$10k-15k</strong>
                    <span className='text-neutral-500'>/month</span></p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
