import { Net } from 'electron';
import {
	WindowHandler,
	DataHandler,
	NetworkHandler,
	WebsocketHandler,
	FileHandler,
} from '../main/preload';

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		windowHandler: WindowHandler;
		data: DataHandler;
		network: NetworkHandler;
		websocket: WebsocketHandler;
		fileHandler: FileHandler;
	}
}

export {};
