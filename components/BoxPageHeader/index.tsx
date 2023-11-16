"use client";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export interface BoxPageHeaderProps {
    isSignedIn: boolean;
    authorUrl: string;
    authorName: string;
    isPublished: boolean;
    boxTitle: string
}
export default function BoxPageHeader({
    isSignedIn,
    authorUrl,
    authorName,
    isPublished,
    boxTitle,
}: BoxPageHeaderProps) {

    return <div className="flex h-16 border-b border-gray-900">
        <div className="flex flex-col justify-center flex-1 h-full pl-4">
            <h1 style={{
                fontSize: "14px",
                fontWeight: 700,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
            }}>{boxTitle}</h1>
            <Link href={authorUrl} className="hover:underline" style={{
                color: "rgb(155, 157, 173)",
                fontWeight: 400,
                fontSize: "12px",
            }}>{authorName}</Link>
        </div>
        <div className="flex items-center">
            {isPublished ? <Button className="mt-6">
                Unpublish
            </Button> : <Button className="mt-6">
                Share
            </Button>}
        </div>
        {isSignedIn ? <Link href="/profile" className="flex items-center justify-center h-full aspect-square"><AccountCircleIcon htmlColor='white' fontSize='large' /></Link> : <Link href="/login" className="flex items-center justify-center px-4 rounded-md border-none h-8 bg-white text-black w-min active:bg-gray-100 whitespace-nowrap font-medium">Sign in</Link>}
    </div>
}