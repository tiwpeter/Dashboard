"use client";
import React from 'react';
import { Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material'; // Correct import statement
import Row1 from '../../ui/component/Row1';
import Row2 from '../../ui/component/Row2';
import Row3 from '../../ui/component/Row3';

const Transactions = () => {
    const theme = useTheme();
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { palette } = theme;

    const gridTemplateLargeScreen = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
    `;
  
    const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
    `;
  
    return (
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.5rem"
            sx={
                isAboveMediumScreens
                    ? {
                        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                        gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                        gridTemplateAreas: gridTemplateLargeScreen,
                    }
                    : {
                        gridTemplateColumns: "1fr",
                        gridTemplateRows: "80px",
                        gridTemplateAreas: gridTemplateSmallScreens,
                    }
            }
        >
            <Row1 />
            <Row2 />
            <Row3 />
        </Box>
    );
}

export default Transactions;
