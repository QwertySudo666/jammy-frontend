export interface ProfileFilters {
    name?: string;
    location?: string;
    skill?: string;
    minExperience?: number;
    minAge?: number;
    instruments?: string[];
    genres?: string[];
    page?: number;
    size?: number;
}