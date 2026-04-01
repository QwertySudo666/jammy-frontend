import { useState, useEffect } from 'react';
import { profileApi } from '../api/profileApi';
import type { Profile } from "../types/profile.ts";
import type { ProfileFilters } from "../types/searchFilter.ts";

export const useProfiles = (filters: ProfileFilters = {}) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({totalCount: 0, pagesCount: 0});

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (!loading) setLoading(true);

            try {
                const response = await profileApi.getAll(filters);

                if (isMounted) {
                    setProfiles(response.data || []);
                    setPagination({
                        totalCount: response.totalCount,
                        pagesCount: response.pagesCount
                    });
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch musicians');
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => { isMounted = false; };
    }, [JSON.stringify(filters)]);

    return { profiles, loading, error, ...pagination };
};