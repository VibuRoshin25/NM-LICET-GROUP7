import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import TodoList from "@/components/TodoList";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "@/components/log.svg";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navbar";
import toast from "react-hot-toast";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

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
        <title>To-Do List</title>
        <meta name="description" content="Created by team 7 of LICET." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-full h-full"
        style={{ background: "white", maxHeight: "100" }}
      ><Navbar/>
        {/* <div className="flex justify-end p-4 ">
          
          {!session ? (
            <button
              className="btn-black h-11 px-8 rounded-md"
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          ) : (
            <button
              className="btn-black w-30 mt-2"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) toast.error("Error logging out");
              }}
            >
              Logout
            </button>
          )}
        </div> */}
        {!session && showLogin && (
          <div className="min-w-full min-h-screen flex items-center justify-center">
            <div className="w-full h-full flex justify-center items-center p-4">
              <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
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
        )}
          <div className="p-4 ">
            <section
              className=" flex justify-center mt-4"
              style={{ minHeight: "100vh" }}
            >
              <div className="container flex text-white flex-col items-center gap-4 text-center">
                <h1
                  className="font-heading text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ color: "orange" }}
                >
                  To-Do List
                </h1>
                <p
                  className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                  style={{ color: "black", fontSize: "2.5vh" }}
                >
                  This is a To-Do list webapp created for Naan mudhalvan
                  course(Full Stack Development with Java) by Team 7 of
                  Loyola-ICAM College of Engineering and Technology.
                </p>
                <div className="space-x-4 mt-4">
                  <Link
                    href="https://github.com/VibuRoshin25/NM-LICET-GROUP7"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "white",
                      border: "2px solid black",
                    }}
                    className="btn-black p-4 bg-blue-600 hover:bg-blue-500"
                  >
                    GitHub
                  </Link>
                </div>
                <table
                  className="border-collapse border w-full"
                  style={{
                    minWidth: 250,
                    maxWidth: 800,
                    margin: "auto",
                    border: "1px solid black",
                    color:"black"
                  }}
                >
                  <thead>
                    <tr
                      className="bg-gray-200 "
                      style={{ border: "1px solid black" }}
                    >
                      <th
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Roll.No
                      </th>
                      <th
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Team Members
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        311120104007
                      </td>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Antony Jude Shaman A
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        311120104013
                      </td>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Babiana Roy
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        311120104015
                      </td>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Danush Athithya
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        311120104062
                      </td>
                      <td
                        className="border p-2"
                        style={{ border: "1px solid black" }}
                      >
                        Vibu Roshin
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section
              id="features"
              className="container space-y-6 bg-slate-white  dark:bg-transparent md:py-12"
              style={{ background: "white" }}
            >
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                  Features
                </h2>
              </div>
              <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
                <div
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                  style={{ border: "2px solid black" }}
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/ios-filled/50/todo-list.png"
                      alt="todo-list"
                    />

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">To-Do List</h3>
                      <p className=" text-muted-foreground">
                        Create tasks, Update & delete tasks, Create teams &
                        Colloborate with team mates.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                  style={{ border: "2px solid black" }}
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                    </svg>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">React</h3>
                      <p className=" text-muted-foreground">
                        Built with React for frontend and Java for backend
                        functionalities.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                  style={{ border: "2px solid black" }}
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <img
                      width="60"
                      height="60"
                      src="https://img.icons8.com/ios-filled/50/postgreesql.png"
                      alt="postgreesql"
                    />

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg ">Database</h3>
                      <p className=" text-muted-foreground">
                        Storage for tasks and teams using Supabase Postgres
                        Database. Fully dynamic data fetched from database.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                  style={{ border: "2px solid black" }}
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="h-12 w-12 fill-current"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Authentication</h3>
                      <p className=" text-muted-foreground">
                        Authentication using Supabase and middlewares. Maintains
                        session between the pages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <SiteFooter />
          </div>
      </div>
    </>
  );
}
