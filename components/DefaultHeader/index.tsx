"use client";

import HeaderAccInfo from '../HeaderAccInfo';

export interface DefaultHeaderProps {
    isSignedIn: boolean;
}
export default function DefaultHeader({
    isSignedIn
}: DefaultHeaderProps) {

    return <div className="flex h-16 border-b border-gray-900 overflow-hidden">
        <div className="flex flex-col justify-center h-full pl-4 flex-1">
            <h1 style={{
                fontSize: "14px",
                fontWeight: 700,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
            }}>SnackBox</h1>
            <h2 style={{
                color: "rgb(155, 157, 173)",
                fontWeight: 400,
                fontSize: "12px",
            }}>The future of bite-sized code</h2>
        </div>
        <HeaderAccInfo isSignedIn={isSignedIn} />
    </div>
}