import React from "react";
import TodoList from "@/components/TodoList";
import Navbar from "@/components/navbar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SiteFooter } from "@/components/site-footer";

function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <div>
        <Navbar />
        {!session && (
          <div className="p-4 ">
            <p className="text-lg mb-4 flex justify-center" style={{color:"red"}}>Please login to continue</p>
            <div className="min-w-full min-h-screen flex ">
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
          </div>
        )}
        {session && (
          <div
            className="w-full h-full p-4 flex flex-col  items-center "
            style={{
              minWidth: 250,
              maxWidth: 800,
              margin: "auto",
              paddingTop: "4vh",
            }}
          >
            <TodoList session={session} />
          </div>
        )}
        {/* <footer style={{bottom:0}}>
          <SiteFooter />
        </footer> */}
      </div>
    </>
  );
}

export default Dashboard;
