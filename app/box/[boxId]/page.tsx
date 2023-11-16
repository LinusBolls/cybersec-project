"use server";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Editor from "@/components/Editor";
import { getBoxById } from "@/services/boxService";
import { getServerSideAuth } from "@/services/serverSideAuthService";
import Link from "next/link";
import { Button } from '@material-tailwind/react';
import BoxPageHeader from '@/components/BoxPageHeader';

export default async function Page({ params: { boxId } }: { params: { boxId: string } }) {

    const { isSignedIn, session } = getServerSideAuth();

    const box = await getBoxById(boxId);


    if (!box) {
        return <div>404</div>;
    }
    const isOwnBox = isSignedIn && box.author?.id === session.userId;

    const boxDto = {
        isOwnBox,
        meta: {
            state: box.state,
            title: box.id,
            author: {
                id: box.author.id,
                name: box.author.name,
            },
        },
        code: {
            html: box.boxCode.html,
            css: box.boxCode.css,
            js: box.boxCode.js,
        },
    };

    return <div className="flex flex-col w-screen h-screen bg-black">
        <BoxPageHeader boxId={box.id} isSignedIn={isSignedIn} authorUrl={`/users/${box.author.id}`} authorName={box.author.name} isPublished={box.state === "PUBLISHED"} boxTitle={box.title} />
        <Editor initialBox={boxDto} />
    </div >
}   