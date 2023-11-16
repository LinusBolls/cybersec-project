"use server";

import Editor from "@/components/Editor";
import { getBoxById } from "@/services/boxService";
import { getServerSideAuth } from "@/services/serverSideAuthService";
import Link from "next/link";

export default async function Page({ params: { boxId } }: { params: { boxId: string } }) {

    const { isSignedIn } = getServerSideAuth();

    const box = await getBoxById(boxId);

    if (!box) {
        return <div>404</div>;
    }

    const defaultBox = {
        meta: {
            title: box.id,
            author: {
                name: "Linus Bolls",
                id: "linus-bolls",
            },
        },
        code: {
            html: box.boxCode.html,
            css: box.boxCode.css,
            js: box.boxCode.js,
        },
    };

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
                }}>{box.title}</h1>
                <h2 style={{
                    color: "rgb(155, 157, 173)",
                    fontWeight: 400,
                    fontSize: "12px",
                }}>{box.author?.email}</h2>
            </div>
            {isSignedIn ? "moin" : <Link href="/login" className="flex items-center justify-center px-4 rounded-md border-none h-8 bg-white text-black w-min active:bg-gray-100 whitespace-nowrap font-medium">Sign in</Link>}
        </div>
        <Editor initialBox={defaultBox} />
    </div >
}   