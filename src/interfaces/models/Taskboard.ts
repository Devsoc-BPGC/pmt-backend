import { Project } from './Project';
import { User } from './User';
import { Card } from './Card';

export interface Taskboard {
   id: number;
   name: string;
   description: string;
   github_repo_url: string;
   chat_channel_id: number;
   project?: Project;
   created_by?: User;
   members?: User[];
   cards?: Card[];
}
