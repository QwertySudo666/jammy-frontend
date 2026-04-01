import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/ProfileForm';
import { profileApi } from '../api/profileApi';
import type {ProfileFormData} from "../types/profileSchema.ts";

export const CreateProfile = () => {
    const navigate = useNavigate();

    const handleCreate = async (data: ProfileFormData) => {
        try {
            console.log('handleCreate'+ data);
            await profileApi.create(data);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert("Помилка при створенні профілю в Quarkus!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Join the Community</h1>
            <ProfileForm onSubmit={handleCreate} />
        </div>
    );
};