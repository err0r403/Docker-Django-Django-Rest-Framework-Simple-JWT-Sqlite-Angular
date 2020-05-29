import { AuthorInterface } from './author.interface';

export interface TicketsInterface {
    id: number;
    author: AuthorInterface;
    title: string;
    description: string;
    state: string;
    human_state: string;
    created_at: string;
}