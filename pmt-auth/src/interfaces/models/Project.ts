import { User } from './User';
import { Taskboard } from './Taskboard';

export interface Project {
	id: number;
	name: string;
	description: string;
	chat_channel_id: number;
	created_by_id: number;
	created_by?: User;
	boards?: Taskboard[];
	memmbers?: User[];
}
