import React from "react";
import type {MeContextType} from "../types/meContextType.ts";

export const MeContext = React.createContext<MeContextType | undefined>(undefined);
