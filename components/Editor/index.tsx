"use client";

import { useBoxDraftStore } from "@/stores/boxDraft.store";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript as javascriptLang } from "@codemirror/lang-javascript";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";

export interface EditorProps {
    initialBox: any;
}
export default function Editor({ initialBox }: EditorProps) {

    const { boxDraft, actions: { updateCode } } = useBoxDraftStore();

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
        console.log("onCodeChange useEffect");

        updateSrcDoc();

        updateCode(html, css, js);
    }, [html, css, js]);

    return <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "red",

        overflow: "hidden",
    }}>
        <div className="flex p-1 gap-1 h-2/5 bg-black">
            <CodeMirror
                placeholder="<!-- add HTML code to your box -->"
                theme={vscodeDark}
                extensions={[htmlLang()]}
                lang="html"
                value={html}
                onChange={value => setHtml(value)}
                className="bg-gray-900 w-1/3"
                height="100%"
            />
            <CodeMirror
                placeholder="/* add CSS code to your box */"
                theme={vscodeDark}
                extensions={[cssLang()]}
                lang="css"
                value={css}
                onChange={value => setCss(value)}
                className="bg-gray-900 w-1/3"
                height="100%"
            />
            <CodeMirror
                placeholder="// add JavaScript code to your box"
                theme={vscodeDark}
                extensions={[javascriptLang()]}
                value={js}
                onChange={value => setJs(value)}
                className="bg-gray-900 w-1/3"
                height="100%"
            />
            {/* <textarea onChange={(e) => {
                setHtml(e.currentTarget.value);
            }} value={html} className="w-full h-full bg-gray-900" />
            <textarea onChange={(e) => {
                setCss(e.currentTarget.value);
            }} value={css} className="w-full h-full bg-gray-900" />
            <textarea onChange={(e) => {
                setJs(e.currentTarget.value);
            }} value={js} className="w-full h-full bg-gray-900" /> */}
        </div>

        {/* <h1 className="text-red-300">{initialBox.meta.title}</h1> */}
        <iframe ref={iframeRef} sandbox="allow-forms allow-modals allow-pointer-lock allow-scripts allow-presentation" srcDoc={srcDoc} className="flex flex-1 bg-gray-900" />
    </div>
}