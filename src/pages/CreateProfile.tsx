import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/ProfileForm';
import { profileApi } from '../api/profileApi';
import type {ProfileFormData} from "../types/profileSchema.ts";
import axios from "axios";
import {useContext} from "react";
import {MeContext} from "../context/MeContext.tsx";

export const CreateProfile = () => {
    const meContext = useContext(MeContext);
    const navigate = useNavigate();

    const handleCreate = async (data: ProfileFormData) => {
        try {
            console.log('handleCreate' + data);
            await profileApi.create(data);
            profileApi.me().then((profileId) => meContext?.setMe(profileId));
            navigate('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message || err.response?.data || err.message;
                console.error('Error details:', err.response?.data);
                alert(`${err.response?.status}: ${JSON.stringify(serverMessage)}`);
            } else {
                console.error('Something went wrong: ', err);
                alert('Something went wrong!');
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Join the Community</h1>
            <ProfileForm onSubmit={handleCreate} />
        </div>
    );
};