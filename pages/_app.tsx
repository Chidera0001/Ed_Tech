import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider> {/* Wrap the Component with ChakraProvider */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
