export declare class MQTTService {
    client: any;
    private scripts;
    private ScriptStore;
    constructor();
    private _load;
    private _loadScript;
    loadingMqtt(onConnectionLost: any, onMessageArrived: any, TOPIC: string[], MQTT_CONFIG: {
        host: string;
        port: number;
        clientId: string;
        path?: string;
    }): any;
    publishMessage(topic: string, playload: string, qos?: number, retained?: boolean): void;
    sendMessage(topic: string, playload: string, qos?: number, retained?: boolean): void;
    private _onConnect;
}
