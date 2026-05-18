import React from "react";

export interface MeContextType {
    me: string | null;
    setMe: React.Dispatch<React.SetStateAction<string | null>>;
}