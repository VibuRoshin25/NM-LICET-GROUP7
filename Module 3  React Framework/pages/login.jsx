import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navbar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  useEffect(() => {
    if (session && !showLogin && !hasRenderedOnce) {
      // Perform any one-time actions or side effects here

      // Set the flag to true to prevent further renders
      setHasRenderedOnce(true);
    }
  }, [session, showLogin, hasRenderedOnce]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Created by team 7 of LICET." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-full h-full"
        style={{ background: "white", maxHeight: "100" }}
      >
        <Navbar />

        {!session && !showLogin && (
          <div className="p-4 ">
            <div className="min-w-full min-h-screen flex">
              <div className="w-full h-full flex justify-center items-center p-4">
                <div
                  className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg- shadow-md rounded-lg flex flex-col text-base"
                  style={{ border: "1px solid black" }}
                >
                  <span className="font-sans font-bold text-4xl text-center pb-2 mb-1 mx-4 align-center">
                    Login
                  </span>
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="light"
                  />
                </div>
              </div>
            </div>
            <SiteFooter />
          </div>
        )}
        {session && !showLogin && toast.success("Log In Successful!")}
        {session && !showLogin && router.push("/dashboard")}
      </div>
    </>
  );
}
