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
    boxId: string;
}
export default function BoxPageHeader({
    boxId,
    isSignedIn,
    authorUrl,
    authorName,
    isPublished,
    boxTitle,
}: BoxPageHeaderProps) {

    async function publishBox() {

        const res = await fetch(`/api/boxes/${boxId}/publish`, {
            method: "POST",
        });
    }
    async function unpublishBox() {

        const res = await fetch(`/api/boxes/${boxId}/unpublish`, {
            method: "POST",
        });
    }
    async function saveBox() {

        const res = await fetch(`/api/boxes/${boxId}`, {
            method: "PUT",
            body: JSON.stringify({
                title: boxTitle,
                code: {
                    html: "",
                    css: "",
                    js: "",
                },
            })
        });
    }

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
            {isOwnBox && <>
                {isPublished ? <Button onClick={onUnpublish} className="bg-red-600">
                Unpublish
                </Button> : <Button onClick={onPublish} className="bg-blue-600">
                    Publish
                </Button>}
                <Button onClick={onSave} className="bg-blue-600">
                    Save changes
                </Button>
            </>}
        </div>
        <HeaderAccInfo isSignedIn={isSignedIn} />
    </div>
}