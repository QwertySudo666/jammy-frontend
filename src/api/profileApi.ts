import {apiClient} from './apiClient';
import type {Profile} from '../types/profile';
import type {PagedResponse} from '../types/apiResponse';
import type {ProfileFormData} from "../types/profileSchema.ts";
import type {ProfileFilters} from "../types/searchFilter.ts";
import type {PresignedUrl} from "../types/presignedUrl.ts";
import axios from "axios";

export const profileApi = {
    getAll: async (filters: ProfileFilters = {}): Promise<PagedResponse<Profile>> => {
        const response = await apiClient.get<PagedResponse<Profile>>('/profiles', {
            params: filters,
            paramsSerializer: {
                indexes: null
            }
        });
        return response.data;
    },

    create: (data: ProfileFormData) => apiClient.post('/profiles', data),

    getById: async (id: string): Promise<Profile> => {
        const response = await apiClient.get<Profile>(`/profiles/${id}`);
        return response.data;
    },

    update: async (id: string, data: ProfileFormData): Promise<Profile> => {
        const response = await apiClient.put<Profile>(`/profiles/${id}`, data);
        return response.data;
    },

    getPresignedUrl: async (fileName: string): Promise<PresignedUrl> => {
        const response = await apiClient.get<PresignedUrl>(`/media/presigned-url`, {
            params: { fileName }
        });
        return response.data;
    },

    uploadFile: async (file: File, presignedUrl: string): Promise<void> => {
        await axios.put(presignedUrl, file, {
            headers: { 'Content-Type': file.type }
        });
    },

    downloadFile: async (url: string): Promise<string> => {
        return await axios.get(url);
    }
};