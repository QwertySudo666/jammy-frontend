import {useEffect, useMemo, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {profileApi} from '../api/profileApi';
import {ProfileForm} from '../components/ProfileForm';
import type {Profile} from '../types/profile';
import type {ProfileFormData} from "../types/profileSchema.ts";

const getSkillStyles = (skill: string) => {
    switch(skill) {
        case 'PROFESSIONAL': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'ADVANCED': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'INTERMEDIATE': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
};

const S3_BASE_URL = "http://localhost:4566/jammy-media";

export const ProfileDetails = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            profileApi.getById(id)
                .then(data => {
                    setProfile(data)
                })
                .catch(err => console.error("Error fetching profile:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const avatarUrl = useMemo(() => {
        console.log(`Пасукдство ${profile?.avatarUrl}`)
        if (profile?.avatarUrl) {
            console.log(`${S3_BASE_URL}/${profile.avatarUrl}`)
            return `${S3_BASE_URL}/${profile.avatarUrl}`;
        }
        return "/james.png";
    }, [profile?.avatarUrl]);

    const handleUpdate = async (data: ProfileFormData) => {
        if (!id) return;
        try {
            const updated = await profileApi.update(id, data);
            setProfile(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    if (loading) return <div className="text-center py-20">Loading profile...</div>;
    if (!profile) return <div className="text-center py-20">Profile not found 🎸</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black">
                    ← Back
                </button>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${
                        isEditing ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    }`}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {isEditing ? (
                <ProfileForm
                    onSubmit={handleUpdate}
                    defaultValues={profile}
                />
            ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-8 pb-10 border-b border-gray-50 mb-8">
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl shrink-0"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/james.png";
                            }}
                        />

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight">{profile.name}</h1>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-2">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getSkillStyles(profile.skill || '')}`}>
                                            {profile.skill} JAMMER
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-500 font-medium">
                                <span className="flex items-center gap-1">📍 {profile.location}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span
                                    className="flex items-center gap-1">🎸 {profile.yearsOfExperience} years of jam</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <section className="md:col-span-2">
                            <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-4">
                                About
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {profile.description}
                            </p>
                        </section>

                        <section className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-3">
                                    Instruments
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.instruments.map(i => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-3">
                                    Favorite Genres
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.genres.map(g => (
                                        <span
                                            key={g}
                                            className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
