"use server";

import Editor from "@/components/Editor";
import { getBoxById } from "@/services/boxService";
import { getServerSideAuth } from "@/services/serverSideAuthService";
import BoxPageHeader from '@/components/BoxPageHeader';
import BoxEditingModal from "@/components/BoxEditingModal";
import BoxView from "@/components/BoxView";

export default async function Page({ params: { boxId } }: { params: { boxId: string } }) {

    const { isSignedIn, session } = getServerSideAuth();

    const box = await getBoxById(session?.userId, boxId);


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
        <BoxView box={boxDto} isSignedIn={isSignedIn} authorUrl={`/users/${box.author.id}`} authorName={box.author.name} isPublished={box.state === "PUBLISHED"} boxTitle={box.title} boxId={box.id} isOwnBox={isOwnBox} initialBox={boxDto} boxDescription={""} />
    </div >
}   