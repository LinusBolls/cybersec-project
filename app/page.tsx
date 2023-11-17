"use server";

import BoxGrid from "@/components/BoxGrid";
import DefaultHeader from "@/components/DefaultHeader";
import { getBoxes } from "@/services/boxService";
import { getServerSideAuth } from "@/services/serverSideAuthService";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default async function Page() {

  const boxes = await getBoxes({ state: "PUBLISHED" });

  const { isSignedIn } = await getServerSideAuth();

  return <div className="flex flex-col w-screen h-screen bg-black">
    <DefaultHeader isSignedIn={isSignedIn} />
    <BoxGrid boxes={boxes.map(i => ({
      id: i.id,
      title: i.title,
      author: {
        id: i.author.id,
        name: i.author.name,
      },
      boxCode: {
        html: i.boxCode.html,
        css: i.boxCode.css,
        js: i.boxCode.js,
      },
    }))} />
  </div>
}
