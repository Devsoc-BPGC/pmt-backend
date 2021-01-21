import { User } from './User';

export interface GithubDetails {
	user?: User;
	html_url: string;
	type: string;
	site_admin: boolean;
	company?: string;
	blog?: string;
	location?: string;
	bio?: string;
	hireable?: boolean;
	twitter_username?: string;
	followers: number;
	following: number;
	public_repos?: number;
	public_gists?: number;
	private_gists?: number;
	total_private_repos?: number;
	owned_private_repos?: number;
	collaborators?: number;
	two_factor_authentication?: boolean;
	organizations_url?: string;
}
