import { useState, useEffect } from 'react';
import type { ProfileFilters as IFilters } from '../types/searchFilter.ts';

interface Props {
    onFilterChange: (filters: IFilters) => void;
}

export const ProfileFilters = ({ onFilterChange }: Props) => {
    const [filters, setFilters] = useState<IFilters>({
        name: '',
        location: '',
        skill: '',
        minExperience: undefined,
        minAge: undefined,
        instruments: [],
        genres: []
    });

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value === '' ? undefined : (name === 'minExperience' ? Number(value) : value)
        }));
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 mb-10">
            {/* Ряд 1: Текстовий пошук та основні параметри */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Musician Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Location</label>
                    <input
                        name="location"
                        type="text"
                        placeholder="City..."
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Skill Level</label>
                    <select
                        name="skill"
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                        onChange={handleChange}
                    >
                        <option value="">Any Skill</option>
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="PROFESSIONAL">Professional</option>
                    </select>
                </div>
            </div>

            {/* Ряд 2: Числові фільтри та теги */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-50">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Min Age</label>
                    <input
                        name="minAge"
                        type="number"
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Min Experience</label>
                    <input
                        name="minExperience"
                        type="number"
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Для інструментів та жанрів поки зробимо прості інпути,
                    але на бекенд будемо відправляти масив (split за комою) */}
                <div className="md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Instruments</label>
                    <input
                        placeholder="Guitar, Drums..."
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            instruments: e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
                        }))}
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Genres</label>
                    <input
                        placeholder="Rock, Jazz..."
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            genres: e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};