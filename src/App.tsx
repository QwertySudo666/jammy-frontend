import { Routes, Route, Link } from 'react-router-dom';
import { ProfileList } from './pages/ProfileList';
import { CreateProfile } from './pages/CreateProfile';
import {ProfileDetails} from "./pages/ProfileDetails.tsx";

function App() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* HEADER / NAVIGATION */}
            <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black text-gray-900">
                        JAMMY<span className="text-blue-600">.</span>
                    </Link>

                    <Link
                        to="/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all"
                    >
                        + Create Profile
                    </Link>
                </div>
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className="max-w-6xl mx-auto py-12 px-4">
                <Routes>
                    <Route path="/" element={<ProfileList />} />
                    <Route path="/create" element={<CreateProfile />} />
                    <Route path="*" element={<div className="text-center">404 - Not Found</div>} />
                    <Route path="/profiles/:id" element={<ProfileDetails />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;