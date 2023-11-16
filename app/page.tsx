"use server";

import BoxGrid from "@/components/BoxGrid";
import { getBoxes } from "@/services/boxService";
import { getServerSideAuth } from "@/services/serverSideAuthService";
import Link from "next/link";

export default async function Page() {

  const boxes = await getBoxes({ state: "PUBLISHED" });

  const { isSignedIn } = getServerSideAuth();

  return <div className="flex flex-col w-screen h-screen bg-black">
    <div className="flex h-16 border-b border-gray-900">
      <div className="flex flex-col justify-center h-full pl-4">
        <h1 style={{
          fontSize: "14px",
          fontWeight: 700,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}>HI</h1>
        <h2 style={{
          color: "rgb(155, 157, 173)",
          fontWeight: 400,
          fontSize: "12px",
        }}>Hu</h2>
      </div>
      {isSignedIn ? "moin" : <Link href="/login" className="flex items-center justify-center px-4 rounded-md border-none h-8 bg-white text-black w-min active:bg-gray-100 whitespace-nowrap font-medium">Sign in</Link>}
    </div>
    <BoxGrid boxes={boxes.map(i => ({
      id: i.id,
      title: i.title,
      author: {
        id: i.author.id,
        name: i.author.email,
      },
      boxCode: {
        html: i.boxCode.html,
        css: i.boxCode.css,
        js: i.boxCode.js,
      },
    }))} />
  </div>
}
