import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	JoinTable,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	BaseEntity,
	OneToMany
} from 'typeorm';
import { Github } from './Github';
import { Project } from './Project';
import { Taskboard } from './Taskboard';
import { Card } from './Card';
import { Permission } from './Permission';

import { ObjectType, Field, ID } from 'type-graphql';

export enum UserRole {
	COORDI = 'coordi',
	CORE = 'core',
	CREW = 'crew'
}

@Entity({name: 'users'})
@ObjectType()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id?: number;

	@Column('varchar')
	@Field()
	name?: string;

	@Column({ type: 'varchar', unique: true })
	@Field()
	email?: string;

	@Column({ type: 'text', nullable: true })
	@Field()
	avatar_url?: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.CREW
	})
	@Field()
	org_role?: UserRole;

	@Column({
		type: 'text',
		unique: true
	})
	@Field()
	github_username?: string;

	@OneToOne((type) => Github)
	@JoinColumn()
	@Field(() => Github)
	github?: Github;

	@CreateDateColumn({ nullable: false })
	@Field()
	created_at?: Date;

	@UpdateDateColumn({ nullable: false })
	@Field()
	updated_at?: Date;

	@ManyToMany((type) => Project, project => project.members, {
		cascade: true
	})
	@Field(() => [Project])
	projects?: Project[];

	@ManyToMany(type => Taskboard, board => board.members, {
		cascade: true
	})
	@Field(() => [Taskboard])
	boards?: Taskboard[];

	@ManyToMany(type => Card, card => card.members, {
		cascade: true
	})
	@Field(() => [Card])
	cards?: Card[];

	@OneToMany((type) => Permission, permission => permission.user, {
		cascade: true
	})
	@Field(() => [Permission])
	permissions?: Permission[];
}
