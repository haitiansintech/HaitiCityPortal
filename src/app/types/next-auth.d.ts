import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            role: string;
            tenantId: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string;
        role: string;
        tenantId: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: string;
        tenantId?: string;
    }
}