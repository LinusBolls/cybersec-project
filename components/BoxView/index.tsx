"use client";

import { useEffect } from "react";
import BoxEditingModal from "../BoxEditingModal";
import BoxPageHeader from "../BoxPageHeader";
import Editor, { EditorProps } from "../Editor";
import { useBoxDraftStore } from "@/stores/boxDraft.store";

export interface BoxViewProps extends EditorProps {
    box: any;
    isSignedIn: boolean;
    authorUrl: string;
    authorName: string;
    isPublished: boolean;
    boxTitle: string
    boxId: string;
    isOwnBox: boolean;
    boxDescription: string;
}
export default function BoxView({
    box,
    isSignedIn,
    authorUrl,
    authorName,
    boxTitle,
    boxId,
    isOwnBox,
    initialBox,
    boxDescription,

}: BoxViewProps) {

    const { boxDraft, actions: { setDraft, updateState } } = useBoxDraftStore();

    useEffect(() => {
        setDraft({
            id: box.meta.id,
            title: box.meta.title,
            description: "",
            state: box.meta.state,
            html: box.code.html,
            css: box.code.css,
            js: box.code.js,
        });
    }, []);

    async function publishBox() {

        const res = await fetch(`/api/boxes/${boxId}/publish`, {
            method: "POST",
        });
    }
    async function unpublishBox() {

        const res = await fetch(`/api/boxes/${boxId}/unpublish`, {
            method: "POST",
        }).then(() => updateState("PRIVATE"));
    }
    async function saveBox() {

        const res = await fetch(`/api/boxes/${boxId}`, {
            method: "PUT",
            body: JSON.stringify({
                meta: {
                    title: boxDraft.title,
                },
                code: {
                    html: boxDraft.html,
                    css: boxDraft.css,
                    js: boxDraft.js,
                },
            }),
        }).then(() => updateState("PUBLISHED"));
    }
    console.log("sache:", boxDraft.title.length > 0 ? boxDraft.state : box.state);

    return <>
        <BoxPageHeader isOwnBox={isOwnBox} boxId={boxId} isSignedIn={isSignedIn} authorUrl={authorUrl} authorName={authorName} isPublished={(boxDraft.title.length > 0 ? boxDraft.state : box.state) === "PUBLISHED"} boxTitle={boxTitle} onPublish={publishBox} onUnpublish={unpublishBox} onSave={saveBox} />
        <Editor initialBox={initialBox} />
        <BoxEditingModal initialData={{ title: boxTitle, description: boxDescription }} isOpen={false} onClose={() => { }} onSubmit={() => { }} />
    </>
}