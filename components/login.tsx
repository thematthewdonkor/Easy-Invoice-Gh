"use client";

import { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const LogIn = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="mt-12 lg:mt-0">
      <SignedIn>
        <Button variant="userbtn" asChild>
          <UserButton
            showName
            appearance={{
              elements: {
                formButtonPrimary: "text-sm",
              },
            }}
          />
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
