export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'PROFESSIONAL';

export interface Profile {
    id: string;
    name: string;
    location?: string;
    skill?: SkillLevel;
    yearsOfExperience?: number;
    description: string;
    instruments: string[];
    genres: string[];
}