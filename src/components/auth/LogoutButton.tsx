"use client";

import { handleLogout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <form action={handleLogout}>
            <Button
                type="submit"
                variant="outline"
                className="flex items-center gap-2"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </form>
    );
}
