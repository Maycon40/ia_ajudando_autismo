"use client";

import { AuthProvider } from "./auth";

export const Providers = ({ children }) => {
    return <AuthProvider>{ children }</AuthProvider>
};
