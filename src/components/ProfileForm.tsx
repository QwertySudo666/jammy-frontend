import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {profileSchema, type ProfileFormData} from '../types/profileSchema';

export const ProfileForm = ({
                                onSubmit,
                                defaultValues
                            }: {
    onSubmit: (data: ProfileFormData) => void,
    defaultValues?: Partial<ProfileFormData>
}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Create Musician Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stage Name</label>
                    <input
                        {...register('name')}
                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        {...register('location')}
                        placeholder="e.g. Kyiv, UA"
                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skill Level */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Level</label>
                    <select
                        {...register('skill')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
                    >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                        <option value="PROFESSIONAL">Professional</option>
                    </select>
                </div>

                {/* Years of Experience */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                        type="number"
                        {...register('yearsOfExperience', {valueAsNumber: true})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
                    />
                </div>
            </div>

            {/* Instruments - Scrollable Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instruments (Select at least one)
                </label>
                <div
                    className="h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    {['GUITAR', 'DRUMS', 'BASS', 'VOCALS', 'KEYBOARDS', 'SAXOPHONE', 'VIOLIN', 'TRUMPET', 'FLUTE'].map((inst) => (
                        <label key={inst}
                               className="flex items-center p-2 hover:bg-white rounded-md cursor-pointer transition-colors shadow-sm border border-transparent hover:border-gray-100">
                            <input
                                type="checkbox"
                                value={inst}
                                {...register('instruments')}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">{inst}</span>
                        </label>
                    ))}
                </div>
                {errors.instruments && <p className="text-red-500 text-xs mt-1">{errors.instruments.message}</p>}
            </div>

            {/* Genres - Scrollable Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genres
                </label>
                <div
                    className="h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    {['ROCK', 'METAL', 'JAZZ', 'BLUES', 'POP', 'COUNTRY', 'CLASSICAL', 'ELECTRONIC', 'HIP_HOP'].map((genre) => (
                        <label key={genre}
                               className="flex items-center p-2 hover:bg-white rounded-md cursor-pointer transition-colors shadow-sm border border-transparent hover:border-gray-100">
                            <input
                                type="checkbox"
                                value={genre}
                                {...register('genres')}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">{genre}</span>
                        </label>
                    ))}
                </div>
                {errors.genres && <p className="text-red-500 text-xs mt-1">{errors.genres.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <button type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 active:scale-[0.98]">
                Publish Profile
            </button>
        </form>
    );
};