import { handlers } from './loop/handlers';

export type ID = string;

export type Handler<T extends Agent = Agent> = (
	tick: number,
	ownState: T,
	gameState: GameState
) => T;

export enum AgentStateType {
	'UNIT',
	'MOVER',
}

export interface WithXY {
	x: number;
	y: number;
}

export interface WithID {
	id: ID;
}

export interface BaseAgent extends WithXY, WithID {
	emoji: string;
	type: AgentStateType;
	handler?: keyof typeof handlers;
}

export interface UnitAgent extends BaseAgent {
	exports: number;
	imports: number;
	type: AgentStateType.UNIT;
}

export interface MoverAgent extends BaseAgent {
	held: number;
	from: ID[];
	to: ID[];
	type: AgentStateType.MOVER;
	path: WithXY[];
}

export type Agent = UnitAgent | MoverAgent;

export interface Road extends WithID {
	id: string;
	name?: string;
	start: WithXY;
	end: WithXY;
}

export interface GameState {
	paused: boolean;
	width: number;
	height: number;
	date: number;
	agents: { [key: string]: Agent };
	roads: { [key: string]: Road };
}
