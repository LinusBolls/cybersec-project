"use client";;

import { useEffect } from "react"

export default function Page() {

    useEffect(() => {
        fetch("/api/auth/login", {
            method: "POST",

            body: JSON.stringify({
                email: "foomeister",
                password: "sack",
            }),
        }).then((res) => res.json()).then(console.log);
    }, []);

    return <div>moin</div>
}