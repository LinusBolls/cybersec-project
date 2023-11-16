"use client";

import _ from "lodash";
import { useEffect, useRef, useState } from "react";

export interface EditorProps {
    initialBox: any;
}
export default function Editor({ initialBox }: EditorProps) {

    const [html, setHtml] = useState(initialBox.code.html);
    const [css, setCss] = useState(initialBox.code.css);
    const [js, setJs] = useState(initialBox.code.js);

    const getSrcDoc = () => {

        return `<!DOCTYPE html><html><script defer>window.addEventListener("load", () => {${js}});</script><style>${css}</style>${html}</html>`;
    }

    const [srcDoc, setSrcDoc] = useState(getSrcDoc());

    function updateSrcDoc() {
        setSrcDoc(getSrcDoc());
    }
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        fetch('/api/health').then(res => res.json()).then(console.log);

        // if (iframeRef.current) {
        //     iframeRef.current.contentWindow!.addEventListener('load', () => {
        //     });
        // }
    }, []);

    // const ding = _.debounce(updateSrcDoc, 5000, { leading: false, trailing: true });
    const onCodeChange = updateSrcDoc;

    useEffect(() => {
        onCodeChange();
    }, [html, css, js]);

    return <div>

        <div className="flex p-1 gap-1">
            <textarea onChange={(e) => {
                setHtml(e.currentTarget.value);
            }} value={html} className="w-1/3 h-1/3 bg-gray-900" />
            <textarea onChange={(e) => {
                setCss(e.currentTarget.value);
            }} value={css} className="w-1/3 h-1/3 bg-gray-900" />
            <textarea onChange={(e) => {
                setJs(e.currentTarget.value);
            }} value={js} className="w-1/3 h-1/3 bg-gray-900" />
        </div>

        <h1 className="text-red-300">{initialBox.meta.title}</h1>
        <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={srcDoc} className="w-2/3 h-full bg-gray-900" />
    </div>
}