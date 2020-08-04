import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'github'})
@ObjectType()
export class Github extends BaseEntity {

    @PrimaryColumn('text')
	@Field(() => ID)
    username?: string;

    @Column('text')
    @Field()
    login?: string;

    @Column('text')
    @Field()
    avatar_url?: string;

    @Column('text')
    @Field()
    html_url?: string;

    @Column('text')
    @Field()
    repos_url?: string;

    @Column('text')
    @Field()
    name?: string;

    @Column('text')
    @Field()
    company?: string;

    @Column('text')
    @Field()
    blog?: string;

    @Column('text')
    @Field()
    location?: string;

    @Column('text')
    @Field()
    email?: string;

    @Column('text')
    @Field()
    bio?: string;

    @Column('text')
    @Field()
    twitter_username?: string;

    @Column('int')
    @Field()
    public_repos?: number;

    @Column('int')
    @Field()
    public_gists?: number;

    @Column('int')
    @Field()
    followers?: number;

    @Column('int')
    @Field()
    following?: number;

    @Column('int')
    @Field()
    private_gists?: number;

    @Column('int')
    @Field()
    total_private_repos?: number;

    @Column('int')
    @Field()
    owned_private_repos?: number;
}
