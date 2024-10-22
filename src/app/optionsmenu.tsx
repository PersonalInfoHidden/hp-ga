"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

function OptionsMenu({ children }: { children?: React.ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>Rizz</DropdownMenuContent>
        </DropdownMenu>
    );
}

export default OptionsMenu;
