import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type TelegramProviderProps = { initialize: {} } & PropsWithChildren;

const TelegramContext = createContext({});

export const TelegramProvider = (props: TelegramProviderProps) => {
  const [tgWebApp, setTgWebApp] = useState(props.initialize);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.backgroundColor = '#ffffff';
      tg.headerColor = '#ffffff';
      tg.isClosingConfirmationEnabled = true;

      setTgWebApp(tg);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ tgWebApp }}>
      {props.children}
    </TelegramContext.Provider>
  );
};

const useTelegram = () => {
  const context = useContext(TelegramContext);

  if (!context) {
    throw new Error('Please use TelegramProvider in parent component');
  }

  return context;
};

export default useTelegram;
