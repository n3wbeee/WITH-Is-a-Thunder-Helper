import { WindowHandler, DataHandler } from '../main/preload';

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		windowHandler: WindowHandler;
		data: DataHandler;
	}
}

export {};
