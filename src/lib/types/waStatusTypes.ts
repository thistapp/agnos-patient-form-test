export interface WaStatusOptions {
	connected: "connected";
	connecting: "connecting";
	disconnected: "disconnected";
}

export enum WsStatus {
	Connecting = "connecting",
	Connected = "connected",
	Disconnected = "disconnected",
}
