"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView2 = () => {
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: "/home",
            },
            {
                onSuccess: () => {
                    router.push("/home");
                    setPending(false);
                },
                onError: ({ error }) => {
                    setPending(false);
                    setError(error.message);
                },
            }
        );
    };

    const onSocial = async (provider: "google" | "github") => {
        setError(null);
        setPending(true);
        await authClient.signIn.social(
            {
                provider: provider,
                callbackURL: "/home",
            },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({ error }) => {
                    setPending(false);
                    setError(error.message);
                },
            }
        );
    };

    return (
        <div className="w-full h-svh lg:grid lg:grid-cols-2">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-black" />
                <Image
                    src="/wallpaper.webp"
                    alt="Authentication Background"
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-50 block"
                    priority
                />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="mr-2 h-8 w-8"
                    />
                    {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </div>
            </div>
            <div className="flex h-full flex-col items-center justify-center overflow-y-auto py-12 dark bg-black text-foreground">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="m@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    href="/forgot-password"
                                                    className="ml-auto inline-block text-sm underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {!!error && (
                                <Alert className="bg-destructive/10 border-none text-destructive">
                                    <OctagonAlertIcon className="h-4 w-4" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}

                            <Button disabled={pending} type="submit" className="w-full">
                                Login
                            </Button>

                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-black text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    onClick={() => onSocial("google")}
                                    disabled={pending}
                                    type="button"
                                    variant={"outline"}
                                    className="w-full"
                                >
                                    <FaGoogle className="mr-2 h-4 w-4" /> Google
                                </Button>

                                <Button
                                    onClick={() => onSocial("github")}
                                    disabled={pending}
                                    type="button"
                                    variant={"outline"}
                                    className="w-full"
                                >
                                    <FaGithub className="mr-2 h-4 w-4" /> GitHub
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/sign-up-2" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
