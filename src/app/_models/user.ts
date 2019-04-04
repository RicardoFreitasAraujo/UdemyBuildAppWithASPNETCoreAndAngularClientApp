import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knowAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoURL:string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}