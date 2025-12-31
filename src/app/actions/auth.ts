"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function handleLogout() {
    await signOut({ redirect: false });
    redirect("/login");
}

export async function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return {
            success: true,
            message: "Login successful",
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        message: "Invalid email or password",
                    };
                default:
                    return {
                        success: false,
                        message: "An error occurred during login",
                    };
            }
        }
        throw error;
    }
}
