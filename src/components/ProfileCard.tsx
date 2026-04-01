import type {Profile} from '../types/profile';
import {Link} from "react-router-dom";

interface Props {
    profile: Profile;
}

// const skillColors = {
//     BEGINNER: 'bg-green-100 text-green-700 border-green-200',
//     INTERMEDIATE: 'bg-blue-100 text-blue-700 border-blue-200',
//     ADVANCED: 'bg-purple-100 text-purple-700 border-purple-200',
//     PROFESSIONAL: 'bg-red-100 text-red-700 border-red-200',
// };

const getSkillStyles = (skill: string) => {
    switch(skill) {
        case 'PROFESSIONAL': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'ADVANCED': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'INTERMEDIATE': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
};


export const ProfileCard = ({profile}: Props) => {
    return (
        <Link to={`/profiles/${profile.id}`}>
            <div
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {profile.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            📍 {profile.location}
                        </p>
                    </div>
                    <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getSkillStyles(profile.skill || 'BEGINNER')}`}>
                      {profile.skill}
                    </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                    {profile.description || "No description provided."}
                </p>

                <div className="space-y-3">
                    <div>
                        <span
                            className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Instruments</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {profile.instruments.map(inst => (
                                <span key={inst}
                                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {inst}
              </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                        <span>{profile.yearsOfExperience} years exp.</span>
                        <span className="italic">{profile.genres.join(', ')}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};