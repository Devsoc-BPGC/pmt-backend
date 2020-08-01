import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	JoinTable,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Timestamp,
	ManyToMany
} from 'typeorm';
import { Github } from './Github';
import { Project } from './Project';
import { Taskboard } from './Taskboard';
import { Card } from './Card';

export enum UserRole {
	COORDI = 'coordi',
	CORE = 'core',
	CREW = 'crew'
}

@Entity({name: 'users'})
export class Users {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column('varchar')
	name: string | undefined;

	@Column({ type: 'varchar', unique: true })
	email: string | undefined;

	@Column({ type: 'text', nullable: true })
	avatar_url: string | undefined;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.CREW
	})
	org_role: UserRole | undefined;

	@Column({
		type: 'text',
		unique: true
	})
	github_username: string | undefined;

	@OneToOne((type) => Github)
	@JoinColumn()
	github: Github | undefined;

	@CreateDateColumn()
	created_at: Timestamp | undefined;

	@UpdateDateColumn()
	updated_at: Timestamp | undefined;

	@ManyToMany((type) => Project, project => project.members, {
		cascade: true
	})
	projects: Project[] | undefined;

	@ManyToMany(type => Taskboard, board => board.members, {
		cascade: true
	})
	boards: Taskboard[] | undefined;

	@ManyToMany(type => Card, card => card.members, {
		cascade: true
	})
	cards: Card[] | undefined;

}
