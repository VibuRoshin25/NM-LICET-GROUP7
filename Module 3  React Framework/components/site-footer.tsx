"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import logo from "./log.svg";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)} style={{}}>
      <div
        style={{ border: "1px solid red" }}
        className="container flex flex-row mt-10 bg-gray-200 rounded-md p-4 items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
      >
        <div className="flex flex-row items-center gap-4 px-8 space-x-5 md:flex-row md:gap-2 md:px-0">
          <Image src={logo} className="w-20" alt="Jude" />

          <p className="text-center text- font-bold leading-loose md:text-left">
            &copy; {new Date().getFullYear()} AJS
          </p>
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <Link href="https://github.com/AntonyJudeShaman" target="_blank">
            <button
              className="h-10 w-10 px-1 text-lg"
              style={{ background: "transparent" }}
            >
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/github--v1.png"
                alt="github--v1"
              />
            </button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/antony-jude-shaman/"
            target="_blank"
          >
            <button
              className="h-10 w-10 px-1 mr-0 xl:mr-16 2xl:mr-16"
              style={{ background: "transparent" }}
            >
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/linkedin.png"
                alt="linkedin"
              />
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
