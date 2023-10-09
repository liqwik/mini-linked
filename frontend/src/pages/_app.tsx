import { TelegramProvider } from '@/context/useTelegram';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TelegramProvider>
      <Component {...pageProps} />
    </TelegramProvider>
  );
}
