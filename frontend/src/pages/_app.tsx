import { JobDetailProvider } from '@/context/useJobDetail';
import { TelegramProvider } from '@/context/useTelegram';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      <TelegramProvider>
        <JobDetailProvider>
          <main
            className={`flex min-h-screen flex-col bg-slate-900 p-4 text-slate-100`}
          >
            <Component {...pageProps} />
          </main>
        </JobDetailProvider>
      </TelegramProvider>
    </>
  );
}
