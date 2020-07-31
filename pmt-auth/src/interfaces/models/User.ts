import { UserRole } from '../../database/entity/User';
import { Project } from './Project';
import { Taskboard } from './Taskboard';
import { Card } from './Card';

export interface User {
	id: number;
	name: string;
	email: string;
	avatar_url: string;
   org_roles: UserRole;
	github_username: string;
	projects?: Project[];
	boards?: Taskboard[];
	cards?: Card[];
}
