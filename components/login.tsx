"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Login = () => {
  return (
    <div className="mt-12 lg:mt-0">
      <SignedIn>
        <Button className="text-sm w-full" variant="userbtn" asChild>
          <UserButton showName />
        </Button>
      </SignedIn>

      <SignedOut>
        <Button
          asChild
          variant="matdev"
          className="rounded-full shadow-md text-gray-50"
        >
          <SignInButton mode="modal">Get Started</SignInButton>
        </Button>
      </SignedOut>
    </div>
  );
};
