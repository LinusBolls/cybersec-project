"use client";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export interface HeaderAccInfoProps {
    isSignedIn: boolean;
}
export default function HeaderAccInfo({
    isSignedIn
}: HeaderAccInfoProps) {

    return <div className="flex items-center h-full">
        {isSignedIn ? <Link href="/profile" className="flex items-center justify-center h-full aspect-square">
            <AccountCircleIcon htmlColor='white' fontSize='large' />
        </Link> :
            <Link href="/login" passHref>
                <Button
                    color="white"
                    className="text-gray-900"
                >
                    Sign in
                </Button>
            </Link>
        }
    </div>
}