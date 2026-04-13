import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(2, "Name is too short").max(50),
    location: z.string().min(3, "Location is required"),
    skill: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL']),
    yearsOfExperience: z.number().min(0).max(80),
    description: z.string().max(500).optional(),
    instruments: z.array(z.string()).min(1, "Pick at least one instrument"),
    genres: z.array(z.string()).min(1, "Pick at least one genre"),
    imageUrl: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;