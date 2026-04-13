import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {profileSchema, type ProfileFormData} from '../types/profileSchema';
import {useState} from "react";
import {profileApi} from '../api/profileApi';

export const ProfileForm = ({
                                onSubmit,
                                defaultValues
                            }: {
    onSubmit: (data: ProfileFormData) => void,
    defaultValues?: Partial<ProfileFormData>
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(defaultValues?.imageUrl || null);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1. Локальне прев'ю
        setPreview(URL.createObjectURL(file));
        setIsUploading(true);

        try {
            const uniqueName = `${crypto.randomUUID()}-${file.name}`;

            const {url: presignedUrl} = await profileApi.getPresignedUrl(uniqueName);

            await profileApi.uploadFile(file, presignedUrl);

            // В продакшені краще зберігати тільки uniqueName, але для MVP — повний шлях
            const s3Url = `http://localhost:4566/quarkus.s3.quickstart/${uniqueName}`;

            setValue('imageUrl', uniqueName, {shouldDirty: true, shouldValidate: true});

            // console.log("Значення в формі після setValue:", uniqueName);

            console.log("File uploaded to:", s3Url); //remove
        } catch (error) {
            console.error("Upload failed", error);
            alert("Помилка при завантаженні фото");
            setPreview(defaultValues?.imageUrl || null);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <div className="flex flex-col items-center pb-6 border-b border-gray-50">
                <input type="hidden" {...register('imageUrl')} />
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                        {preview ? (
                            <img src={preview} alt="Avatar preview" className="w-full h-full object-cover"/>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                        )}
                    </div>
                    {/* Кнопка завантаження поверх аватара */}
                    <label
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                        <span className="text-xs font-bold">Change Photo</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <p className="mt-2 text-xs text-gray-400">Click to upload photo</p>
            </div>

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
                    disabled={isUploading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 active:scale-[0.98]">
                Publish Profile
            </button>
        </form>
    );
};
