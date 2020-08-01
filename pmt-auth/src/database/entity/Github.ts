import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'github'})
export class Github {

    @PrimaryColumn('text')
    username: string | undefined;

    @Column('text')
    login: string | undefined;

    @Column('text')
    avatar_url: string | undefined;

    @Column('text')
    html_url: string | undefined;

    @Column('text')
    repos_url: string | undefined;

    @Column('text')
    name: string | undefined;

    @Column('text')
    company: string | undefined;

    @Column('text')
    blog: string | undefined;

    @Column('text')
    location: string | undefined;

    @Column('text')
    email: string | undefined;

    @Column('text')
    bio: string | undefined;

    @Column('text')
    twitter_username: string | undefined;

	@Column('int')
    public_repos: number | undefined;

    @Column('int')
    public_gists: number | undefined;

    @Column('int')
    followers: number | undefined;

    @Column('int')
    following: number | undefined;

    @Column('int')
    private_gists: number | undefined;

    @Column('int')
    total_private_repos: number | undefined;

    @Column('int')
    owned_private_repos: number | undefined;
}
