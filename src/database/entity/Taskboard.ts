import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
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
	id!: number;

	@Column('varchar')
	@Field()
	name!: string;

	@Column('text')
	@Field()
	description!: string;

	@Column('text')
	@Field()
	github_repo_url!: string;

	@CreateDateColumn()
	@Field()
	created_at!: Date;

	@UpdateDateColumn()
	@Field()
	updated_at!: Date;

	// @Column('int')
	// @Field()
	// chat_channel_id?: number;

	@ManyToOne((type) => Project, project => project.boards)
	project!: Project;

	@ManyToOne((type) => Users, user => user.created_boards)
	created_by!: Users;

	@ManyToMany(type => Users, user => user.boards)
	@JoinTable()
	members?: Users[];

	@OneToMany(type => Card, card => card.board)
	cards?: Card[];

	@Column('text')
	@Field()
	background!: string;
}
