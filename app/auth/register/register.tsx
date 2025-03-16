import React from 'react';
import { AppProvider } from './AppContext'; // Import AppProvider
import Index from './index'; // Import the Index component

export default function Register() {
  return (
    <AppProvider>
      <Index />
    </AppProvider>
  );
}