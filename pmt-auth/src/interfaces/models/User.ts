import { UserRole } from '../../database/entity/User';

export interface User {
	id: number;
	name: string;
	email: string;
	avatar_url: string;
   org_roles: UserRole;
   github_username: string;
}
