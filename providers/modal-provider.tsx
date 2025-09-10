"use client";

import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import { StoreModal } from "@/components/modals/store-modal"; // <-- exemplu import

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};
