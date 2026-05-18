import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import {AuthProvider} from "react-oidc-context";
import {oidcConfig} from "./auth/oidcConfig.ts";
import {MeProvider} from "./context/MeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider {...oidcConfig}>
        <React.StrictMode>
            <BrowserRouter>
                <MeProvider>
                    <App/>
                </MeProvider>
            </BrowserRouter>\
        </React.StrictMode>\
    </AuthProvider>
)