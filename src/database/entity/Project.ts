import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
	BaseEntity
} from 'typeorm';
import { Users } from './User';
import { Taskboard } from './Taskboard';

import { ObjectType, Field, ID } from 'type-graphql';

@Entity({name: 'projects'})
@ObjectType()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id!: number;

	@Column({
		type: 'varchar',
		unique: true
	})
	@Field()
	name!: string;

	@Column('text')
	@Field()
	description!: string;

	// @Column('int')
	// @Field()
	// chat_channel_id?: number;

	@ManyToOne((type) => Users, user => user.created_projects)
	created_by!: Users;

	@OneToMany((type) => Taskboard, taskboard => taskboard.project)
	boards?: Taskboard[];

	@CreateDateColumn()
	@Field()
	created_time!: Date;

	@UpdateDateColumn()
	@Field()
	updated_time!: Date;

	@ManyToMany((type) => Users, user => user.projects)
	@JoinTable()
	members?: Users[];

	@Column('text')
	@Field()
	background!: string;
}
