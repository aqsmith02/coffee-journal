import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import './globals.css';
import CoffeeEntries from './CoffeeEntries';
import CreateCoffeeEntry from './CreateCoffeeEntry';

const API_URL = 'http://localhost:8000';

const theme = {
  token: {
    colorPrimary: '#6f5644',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    fontSize: 14,
    borderRadius: 6,
    fontFamily: "'Playfair Display', 'Georgia', 'Garamond', serif",
  },
};

export default function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    function refreshCoffeeEntries() {
        setRefreshTrigger((prev) => prev + 1);
    }

    return (
        <ConfigProvider theme={theme}>
            <header>
                <h1>Coffee Journal</h1>
            </header>
            <main>
                <CreateCoffeeEntry
                    API_URL={API_URL}
                    onEntryCreated={refreshCoffeeEntries}
                />
                <CoffeeEntries API_URL={API_URL} refreshTrigger={refreshTrigger} />
            </main>
        </ConfigProvider>
    );
}
