import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const HelpPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Head>
          <title>Help</title>
        </Head>
        <header>
          <h1 className="text-4xl font-bold mb-6">Todo List App Help</h1>
        </header>
        <main>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-gray-700">
              Welcome to the Todo List App! Here are some quick tips to get
              started:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Use the Todo List tab to manage your tasks.</li>
              <li>Click on &quot;Add&quot; to create a new task.</li>
              <li>
                Toggle between &quot;All,&quot; &quot;Completed,&quot; and &quot;Incomplete&quot; to filter
                your tasks.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Team Management</h2>
            <p className="text-gray-700">
              Explore the &quot;Your Team&quot; tab to manage your team:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                Add team members by entering their names and clicking &quot;Add
                Member.&quot;
              </li>
              <li>Save your team information by clicking &quot;Save Team.&quot;</li>
              <li>View and leave existing teams.</li>
            </ul>
          </section>
          <section className="shadow p-4 flex flex-col bg-gray-200 w-1/2 mx-auto mt-5 rounded border  justify-center" style={{border:"2px solid black"}}>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or need assistance, feel free to contact
              us:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Email: antonyjudeshaman.24cs@licet.ac.in</li>
              <li>Phone: +91 6379223180</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default HelpPage;
