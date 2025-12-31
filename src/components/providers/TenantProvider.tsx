"use client";

import React, { createContext, useContext } from "react";
import type { Tenant } from "@/db/schema";

interface TenantContextType {
    tenant: Tenant | null;
}

const TenantContext = createContext<TenantContextType>({ tenant: null });

export function TenantProvider({
    tenant,
    children,
}: {
    tenant: Tenant;
    children: React.ReactNode;
}) {
    return (
        <TenantContext.Provider value={{ tenant }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error("useTenant must be used within a TenantProvider");
    }
    return context.tenant;
}
