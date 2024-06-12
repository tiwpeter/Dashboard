'use client';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import { CustomProviders } from './provider';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../../src/app/store'; // Adjust the path as necessary

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CustomProviders>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </CustomProviders>
    </Provider>
  );
}
