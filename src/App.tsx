import {useAuth} from 'react-oidc-context'
import {Link, Route, Routes} from 'react-router-dom'
import {ProfileList} from './pages/ProfileList'
import {CreateProfile} from './pages/CreateProfile'
import {ProfileDetails} from './pages/ProfileDetails'
import AuthCallback from './pages/AuthCallback'

function App() {
    const auth = useAuth()

    if (auth.isLoading) {
        return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
        </div>
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black text-gray-900">
                        JAMMY<span className="text-blue-600">.</span>
                    </Link>

                    <div className="flex gap-3 items-center">
                        {auth.isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-500">{auth.user?.profile.email}</span>
                                {/*<Link*/}
                                {/*    to="/create"*/}
                                {/*    // className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all"*/}
                                {/*    className="text-sm font-bold text-gray-700 hover:text-gray-900"*/}
                                {/*>*/}
                                {/*    Create Profile*/}
                                {/*</Link>*/}
                                <button
                                    onClick={() => auth.signoutRedirect()}
                                    className="text-sm text-gray-500 hover:text-gray-900"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => auth.signinRedirect()}
                                    className="text-sm font-bold text-gray-700 hover:text-gray-900"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => auth.signinRedirect({
                                        extraQueryParams: {
                                            kc_action: 'register',
                                            prompt: 'create'
                                        }
                                    })}
                                    // className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all"
                                    className="text-sm font-bold text-gray-700 hover:text-gray-900"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto py-12 px-4">
                <Routes>
                    <Route path="/" element={<ProfileList/>}/>
                    <Route path="/create" element={
                        auth.isAuthenticated
                            ? <CreateProfile/>
                            : <div className="text-center">
                                <p className="text-gray-500 mb-4">Щоб створити профіль — спочатку увійди</p>
                                <button
                                    onClick={() => auth.signinRedirect({
                                        prompt: 'login',
                                    })}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
                                >
                                    Log In
                                </button>
                            </div>
                    }/>
                    <Route path="/callback" element={<AuthCallback/>}/>
                    <Route path="/profiles/:id" element={<ProfileDetails/>}/>
                    <Route path="*" element={<div className="text-center">404 - Not Found</div>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App