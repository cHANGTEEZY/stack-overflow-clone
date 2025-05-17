import SocialAuthForms from "@/components/forms/SocialAuthForms";
import MobileNavigation from "@/components/navigation/navbar/MobileNavigation";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="flex min-h-screen items-center justify-center 
      dark:bg-auth-dark bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10"
    >
      <section
        className="light-border background-light800_dark200 
        shadow-light100_dark100 min-w-full rounded-[10px] border shadow-md px-4 py-10 sm:min-w-[520px] sm:px-8"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Join DevDlow</h1>
            <p className="paragraph-regular text-dark500_light400">
              To get your question answered
            </p>
          </div>
          <Image
            src={"images/site-logo.svg"}
            alt="DevFlow logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {children}

        <SocialAuthForms />
      </section>
    </main>
  );
};

export default AuthLayout;
