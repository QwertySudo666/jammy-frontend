import React, {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {profileApi} from "../api/profileApi";
import {MeContext} from "./MeContext";

export function MeProvider({children}: { children: React.ReactNode }) {
    const auth = useAuth();
    const [me, setMe] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        console.log("ME: " + me)
        console.log("IS AUTH: " + auth.isAuthenticated)
        if (!auth.isAuthenticated) {
            setMe(null);
            return;
        }

        profileApi.me()
            .then((id) => {
                if (alive) setMe(id);
            })
            .catch(() => {
                if (alive) setMe(null);
            });

        return () => {
            alive = false;
        };
    }, [auth.isAuthenticated]);

    return (
        <MeContext.Provider value={{me, setMe}}>
            {children}
        </MeContext.Provider>
    );
}