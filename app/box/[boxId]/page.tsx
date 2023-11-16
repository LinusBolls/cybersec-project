"use server";
import Editor from "@/components/Editor";
import { getServerSideAuth } from "@/services/serverSideAuthService";

export default async function Page({ params: { boxId } }: { params: { boxId: string } }) {

    const { isSignedIn } = getServerSideAuth();

    const defaultBox = {
        meta: {
            title: "Linus's Box " + boxId,
            author: {
                name: "Linus Bolls",
                id: "linus-bolls",
            },
        },
        code: {
            html: `<body>
            <h1 js-data="sache" class="heading">Hello world</h1>
        </body>`,
            css: `.heading {
                color: red;
            }`,
            js: `
            const heading = document.querySelector('[js-data="sache"]');
            
            fetch('/api/health');
            fetch('https://google.com');
            
            heading.innerHTML = "Script loaded successfully 🎉";`,
        },
    };

    return <div>
        {isSignedIn ? "you're signed in!" : "you're not signed in!"}
        <Editor initialBox={defaultBox} />
    </div>
}