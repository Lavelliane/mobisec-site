import { auth, signIn } from "../../../../../auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";

export default async function SignIn() {
  const session = await auth();

  // If user is already authenticated, they shouldn't see this page
  if (session?.user) {
    return (
      <div className="min-h-[calc(100vh-132px)] flex items-center justify-center bg-white">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Already Signed In
            </CardTitle>
            <CardDescription>You are already authenticated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Welcome back, {session.user.name}!
            </p>
            <Button asChild className="w-full">
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-132px)] flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Enter your email and password to access your account.
            </p>
          </div>

          {/* Sign In Form */}
          <div className="space-y-6">
            {/* Social Login Buttons */}
            <div className="flex flex-col gap-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </Button>
              </form>
              <Button
                variant="ghost"
                className="w-full bg-[#fae204] hover:bg-[#fae204]/80 hover:text-black"
                size="lg"
                onClick={async () => {
                  "use server";
                  await signIn("kakao", { redirectTo: "/dashboard" });
                }}
              >
                <Image
                  src="/kakao.svg"
                  alt="Kakao"
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                Kakao
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Copyright © 2025 MobiSec Conference.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute top-0 left-0 z-0 p-8 overflow-hidden w-full h-full">
          <Image
            src="/assets/4.png"
            alt="MobiSec"
            width={1000}
            height={1000}
            priority={true}
            loading="eager"
            className="w-full h-full object-cover rounded-4xl"
          />
        </div>
        <div className="z-10 w-full max-w-lg h-full text-center space-y-8 bg-gradient-to-br from-primary via-primary/10 to-primary/80 px-8 pt-36 rounded-4xl">
          <div className="flex flex-col items-center gap-4 z-10">
            {/* Logo */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/assets/logo/mobisec-logo-v2-white-nobg.png"
                alt="MobiSec"
                width={100}
                height={100}
                className="w-40 h-fit"
              />
              <h2 className="text-4xl font-bold text-white leading-tight">
                Login to MobiSec
              </h2>
            </div>
            <p className="text-primary-foreground/90">
              Log in to access your MobiSec dashboard and manage your
              submissions, reviews, and conference activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
