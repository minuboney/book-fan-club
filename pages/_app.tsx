import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RoleProvider } from '../components/Interface';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoleProvider>
      <Component {...pageProps} />
    </RoleProvider>
  );
}

export default MyApp;
