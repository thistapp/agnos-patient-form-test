import {WebSocketServer, WebSocket} from "ws";

const port = 8080;
const wss = new WebSocketServer({port});

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		try {
			const stringData = message.toString();
			const parsed = JSON.parse(stringData);

			wss.clients.forEach((client) => {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(parsed));
				}
			});
		} catch (err) {
			console.error("[WS Server] Failed to handle message:", err instanceof Error ? err.message : String(err));
		}
	});

	ws.on("close", () => {
		// Connection closed
	});

	ws.on("error", (err) => {
		console.error("[WS Server] Socket error:", err.message);
	});
});
