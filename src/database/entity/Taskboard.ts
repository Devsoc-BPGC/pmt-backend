import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	Timestamp,
	ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
	BaseEntity
} from 'typeorm';

import { Project } from './Project';
import { Users } from './User';
import { Card } from './Card';

import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'taskboards'})
@ObjectType()
export class Taskboard extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id?: number;

	@Column('varchar')
	@Field()
	name?: string;

	@Column('text')
	@Field()
	description?: string;

	@Column('text')
	@Field()
	github_repo_url?: string;

	@CreateDateColumn()
	@Field()
	created_at?: Date;

	@UpdateDateColumn()
	@Field()
	updated_at?: Date;

	@Column('int')
	@Field()
	chat_channel_id?: number;

	@ManyToOne((type) => Project, project => project.boards)
	@Field(() => [Project])
    project?: Project;

    @ManyToOne((type) => Users)
	@JoinColumn()
	@Field(() => [Users])
    created_by?: Users;

    @ManyToMany(type => Users, user => user.boards)
	@JoinTable()
	@Field(() => [Users])
    members?: Users[];

	@OneToMany(type => Card, card => card.board)
	@Field(() => [Card])
    cards?: Card[];

}
