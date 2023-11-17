"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card } from '@material-tailwind/react';
import Link from 'next/link';

export interface BoxGridProps {
    boxes: {
        id: string
        title: string
    }[];
}

export default function BoxGrid({
    boxes: initialBoxes,
}: BoxGridProps) {

    const [boxes, setBoxes] = useState(initialBoxes);

    async function updateBoxes() {

        const boxesRes = await fetch("/api/boxes");

        const boxesData = await boxesRes.json();

        setBoxes(boxesData);
    }
    const getSrcDoc = (box: any) => {

        return `<!DOCTYPE html><html><script defer>window.addEventListener("load", () => {${box.boxCode.js}});</script><style>${box.boxCode.css}</style>${box.boxCode.html}</html>`;
    }
    const router = useRouter();

    return (
        <div className="container mx-auto p-4">
            <button onClick={async () => {

                const res = await fetch("/api/boxes", {
                    method: "POST",
                    body: JSON.stringify({}),
                });
                const data = await res.json();

                router.push(`/box/${data.id}`);

            }}>Create new</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boxes.map((i) => (
                    <Card key={i.id} className="w-full h-[343px] max-w-[473px]">
                        <Link key={i.id} href={`/box/${i.id}`}>
                            <div className="p-4">
                                <h5 className="text-lg font-semibold mb-2">{i.title}</h5>
                                <p className="text-gray-600">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <iframe sandbox="allow-forms allow-modals allow-pointer-lock allow-scripts allow-presentation" scrolling="no" srcDoc={getSrcDoc(i)} className="w-full h-full flex flex-1 bg-gray-900" />
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}