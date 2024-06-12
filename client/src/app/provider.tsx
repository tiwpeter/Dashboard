"use client"
import { SessionProvider } from "next-auth/react";
import React, { Children } from "react"; // Fixed import statement

export const CustomProviders = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};
