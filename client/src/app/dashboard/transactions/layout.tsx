"use client";

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "../../../theme";
import dynamic from 'next/dynamic';
import './index.css';

// Dynamically import the Transactions component with ssr: false
const Transactions = dynamic(() => import('./page'), { ssr: false });

const LayoutTest = ({ children }) => {
    const theme = useMemo(() => createTheme(themeSettings), []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" sx={{ overflowY: 'auto' }}>
                <div className="app">
                    <Transactions />
                </div>
            </Box>
        </ThemeProvider>
    );
};

export default LayoutTest;
