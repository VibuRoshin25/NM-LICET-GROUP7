import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Head>
          <title>About</title>
        </Head>
        <header>
          <h1 className="text-4xl font-bold mb-6">About Todo List App</h1>
        </header>
        <main>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700">
              The Todo List App is more than just a task manager; it&apos;s a
              comprehensive tool designed to empower individuals and teams in
              achieving their goals. Here&apos;s a detailed overview of its key
              features:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Task Management:</strong> Create, edit, and organize
                tasks effortlessly. The intuitive interface allows you to
                prioritize and categorize your to-do list efficiently.
              </li>
              <li>
                <strong>Team Collaboration:</strong> Seamlessly collaborate with
                your team members. The app enables you to create and manage
                teams, fostering effective communication and coordination.
              </li>
              <li>
                <strong>Efficient Organization:</strong> Utilize features such
                as filtering tasks based on completion status to streamline your
                workflow. Stay organized with ease.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Advanced Features</h2>
            <p className="text-gray-700">
              The Todo List App goes beyond basic task management. Explore
              advanced features that enhance your productivity and collaboration
              experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Team Management:</strong> Create and save team
                information, view existing teams, and easily leave teams when
                needed.
              </li>
              <li>
                <strong>Task Customization:</strong> Tailor tasks to your needs
                with options for editing, marking as complete, and categorizing.
              </li>
              <li>
                <strong>Responsive Design:</strong> Access the app seamlessly
                across devices, ensuring a consistent and user-friendly
                experience.
              </li>
            </ul>
          </section>
        </main>
        
        <p className="mt-10 font-bold text-2xl">Created By</p>
        <table
          className="border-collapse mt-2 border w-full"
          style={{
            minWidth: 250,
            maxWidth: 800,
            border: "1px solid black",
            color: "black",
          }}
        >
          <thead>
            <tr className="bg-gray-200 " style={{ border: "1px solid black" }}>
              <th className="border p-2" style={{ border: "1px solid black" }}>
                Roll.No
              </th>
              <th className="border p-2" style={{ border: "1px solid black" }}>
                Team Members
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                311120104007
              </td>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                Antony Jude Shaman A
              </td>
            </tr>
            <tr>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                311120104013
              </td>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                Babiana Roy
              </td>
            </tr>
            <tr>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                311120104015
              </td>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                Danush Athithya
              </td>
            </tr>
            <tr>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                311120104062
              </td>
              <td className="border p-2" style={{ border: "1px solid black" }}>
                Vibu Roshin
              </td>
            </tr>
          </tbody>
        </table>
        <br/><br/>
      </div>
    </>
  );
};

export default AboutPage;
