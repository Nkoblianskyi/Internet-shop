'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import AppHeader from '@/components/app-header/app-header';
import { Nunito } from 'next/font/google';
import './globals.css';
import './styles/index.scss';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <Provider store={store}>
          <AppHeader />
          {children}
        </Provider>
      </body>
    </html>
  );
}
