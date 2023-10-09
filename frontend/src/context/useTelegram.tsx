import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type TelegramProviderProps = {} & PropsWithChildren;

const TelegramContext = createContext({});

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
  const [webApp, setWebApp] = useState({});

  useEffect(() => {
    const tlg = (window as any).Telegram?.WebApp;

    if (tlg) {
      tlg.ready();

      tlg.backgroundColor = '#333333';
      tlg.headerColor = '#333333';
      tlg.isClosingConfirmationEnabled = true;

      setWebApp(tlg);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ TlgWebApp: webApp }}>
      {children}
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
