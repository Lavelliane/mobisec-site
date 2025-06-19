import { auth, signIn } from "../../../../../auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default async function SignIn() {
  const session = await auth()

  // If user is already authenticated, they shouldn't see this page
  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Already Signed In</CardTitle>
            <CardDescription>You are already authenticated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">Welcome back, {session.user.name}!</p>
            <Button asChild className="w-full">
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <Image
              src="/assets/logo/mobisec-logo-v2-nobg.png"
              alt="MobiSec 2025"
              width={120}
              height={60}
              className="mx-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Welcome to MobiSec 2025</CardTitle>
          <CardDescription className="text-gray-600">
            The 9th International Conference on Mobile Internet Security
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Sign in to access the conference dashboard, manage your submissions, and connect with fellow researchers.
            </p>
          </div>
          
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/dashboard" })
            }}
            className="space-y-4"
          >
            <Button 
              type="submit" 
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-center space-x-3">
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="font-medium">Continue with Google</span>
              </div>
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our terms of service and privacy policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 