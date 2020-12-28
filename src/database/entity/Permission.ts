import {
	Entity,
	ManyToOne,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	PrimaryGeneratedColumn
} from 'typeorm';

import { ObjectType, Field, ID } from 'type-graphql';
import { Users } from './User';

export enum PermissionStatus {
	GRANTED = 'granted',
	AWAITED = 'awaited',
	DENIED = 'denied'
}

export enum PermissionType {
	CARD = 'card',
	BOARD = 'task-board',
	PROJECT = 'project'
}

export enum Role {
	MEMBER = 'member',
	ADMIN = 'admin'
}

@Entity({ name: 'permissions' })
@ObjectType()
export class Permission extends BaseEntity {

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id?: number;

	@Column('integer')
	@Field()
	user_id?: number;

	@ManyToOne((type) => Users, user => user.permissions)
	@Field(() => Users)
	user?: Users;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	add?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	view?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	edit?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	delete?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	add_member?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionStatus,
		default: PermissionStatus.DENIED
	})
	@Field()
	remove_member?: PermissionStatus;

	@Column({
		type: 'enum',
		enum: PermissionType
	})
	@Field()
	permission_type?: PermissionType;

	@Column('integer')
	@Field()
	instance_id?: number;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.MEMBER
	})
	@Field()
	role?: Role;

	@CreateDateColumn({
		nullable: false
	})
	@Field()
	created_at?: Date;

	@UpdateDateColumn({
		nullable: false
	})
	updated_at?: Date;
}
