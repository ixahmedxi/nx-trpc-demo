import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import { trpc } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default trpc.withTRPC(App);
