import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="dark:bg-zinc-900 dark:text-white bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
