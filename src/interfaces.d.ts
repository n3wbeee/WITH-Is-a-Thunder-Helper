export type TriggerType = 'onCriticalSpeed' | 'onAirbrakeOn';
export type ActionType =
	| 'clearQueue'
	| 'setStrength'
	| 'increaseStrength'
	| 'decreaseStrength'
	| 'setPulse'
	| 'delay';

export interface Action {
	type: ActionType;
	params: any;
}

export interface Rule {
	readonly id: string;

	name: string;
	trigger: TriggerType;
	actions: Action[];
}
