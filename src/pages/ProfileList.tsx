// src/pages/ProfileList.tsx
import {useContext, useState} from 'react';
import {useProfiles} from '../hooks/useProfiles';
import {ProfileCard} from '../components/ProfileCard';
import {ProfileFilters} from '../components/ProfileFilters';
import type {ProfileFilters as IFilters} from '../types/searchFilter.ts';
import {Link} from "react-router-dom";
import {MeContext} from "../context/MeContext.tsx";

export const ProfileList = () => {
    const me = useContext(MeContext);
    const [filters, setFilters] = useState<IFilters>({
        page: 0,
        size: 6,
    });

    const {profiles, loading, error, pagesCount} = useProfiles(filters);

    const handleFilterChange = (newFilters: IFilters) => {
        setFilters(prev => ({...prev, ...newFilters, page: 0}));
    };

    const goToPage = (page: number) => {
        setFilters(prev => ({...prev, page}));
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
    console.log("Profile List ME" + me?.me)
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Find Jammers 🎸</h1>
                    <p className="text-gray-500 mt-2 text-lg font-medium">Discover musicians and build your band</p>
                </div>
                {!me?.me && (
                    <Link
                        to="/create"
                        // className="bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all text-center shadow-sm"
                        className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all text-center shadow-lg shadow-gray-200"
                    >
                        Create Profile
                    </Link>)
                }
            </header>

            {/* Блок фільтрів */}
            <ProfileFilters onFilterChange={handleFilterChange}/>

            {loading ? (
                <div className="text-center py-20 text-gray-400 font-medium">Updating list...</div>
            ) : (
                <>
                    {/* Список карток */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {profiles.map(profile => (
                            <ProfileCard key={profile.id} profile={profile}/>
                        ))}
                    </div>

                    {profiles.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                            <p className="text-gray-400 text-lg">Nothing found. Try changing filters!</p>
                        </div>
                    )}

                    {/* Пагінація */}
                    {pagesCount > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-12">
                            <button
                                disabled={filters.page === 0}
                                onClick={() => goToPage((filters.page || 0) - 1)}
                                className="px-5 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                ← Back
                            </button>

                            <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-500">
                                Page {(filters.page || 0) + 1} of {pagesCount}
                            </div>

                            <button
                                disabled={(filters.page || 0) + 1 >= pagesCount}
                                onClick={() => goToPage((filters.page || 0) + 1)}
                                className="px-5 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};