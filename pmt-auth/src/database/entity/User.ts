import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Timestamp
} from 'typeorm';
import { Github } from './Github';

export enum UserRole {
	COORDI = 'coordi',
	CORE = 'core',
	CREW = 'crew'
}

@Entity()
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
}
