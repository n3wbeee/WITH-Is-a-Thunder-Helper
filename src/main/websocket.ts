import { WebSocketServer, WebSocket } from 'ws';

const { v4: uuidv4 } = require('uuid');

export class WebSocketManager {
	private wss: WebSocketServer;
	// @ts-ignore
	private ws: WebSocket;

	isConnected: boolean = false;

	channelAStrength: number = 0;
	channelBStrength: number = 0;

	channelALimit: number = 0;
	channelBLimit: number = 0;

	constructor(
		port: number = 1314,
		onConnection?: Function,
		onBind?: Function,
		onDisconnect?: Function,
		onMessage?: Function,
	) {
		this.wss = new WebSocketServer({ port });

		this.wss.on('connection', (ws: WebSocket) => {
			this.ws = ws;
			const clientID = uuidv4();

			if (onConnection) onConnection();

			// 发送绑定消息
			ws.send(
				JSON.stringify({
					type: 'bind',
					clientId: clientID,
					message: 'targetId',
					targetId: '',
				}),
			);

			// 监听发信
			ws.on('message', (message: Buffer) => {
				let data;

				// 尝试解析 message
				try {
					data = JSON.parse(message.toString());
				} catch (e) {
					ws.send(
						JSON.stringify({
							type: 'msg',
							clientId: '',
							targetId: '',
							message: '403',
						}),
					);
					return;
				}

				// 若 message 内容无误...
				if (
					data.type &&
					data.clientId &&
					data.message &&
					data.targetId
				) {
					switch (data.type) {
						case 'bind':
							ws.send(
								JSON.stringify({
									type: 'bind',
									clientId: clientID,
									message: '200',
									targetId: data.targetId,
								}),
							);

							if (onBind) onBind();
							this.isConnected = true;
							break;

						case 'msg':
							if (data.message.includes('strength')) {
								var strengthData = data.message.split(/[-+]/);

								this.channelAStrength = strengthData[1];
								this.channelBStrength = strengthData[2];
								this.channelALimit = strengthData[3];
								this.channelBLimit = strengthData[4];
							}

							if (onMessage) onMessage();
							break;

						case 'break':
							ws.close();
							break;
						default:
							break;
					}
				}
			});

			ws.on('close', () => {
				this.isConnected = false;
				if (onDisconnect) onDisconnect();
			});
		});
	}
}
