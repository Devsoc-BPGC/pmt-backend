import { CardStatus } from '../../database/entity/Card';
import { User } from './User';
import { Taskboard } from './Taskboard';

export interface Card {
	id: number;
	title: string;
	description: string;
	created_by?: User;
	board?: Taskboard;
	labels: string[];
	card_status: CardStatus;
	members?: User[];
	completed_at?: string;
	deadline: string;
}
