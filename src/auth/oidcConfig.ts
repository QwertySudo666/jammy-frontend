export const oidcConfig = {
    authority: import.meta.env.VITE_AUTH_URL,
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_APP_URL + '/callback',
    post_logout_redirect_uri: import.meta.env.VITE_APP_URL,
    scope: 'openid profile email',
}