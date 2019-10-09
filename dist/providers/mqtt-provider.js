var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
var MQTTService = /** @class */ (function () {
    function MQTTService() {
        var _this = this;
        this.scripts = {};
        this.ScriptStore = [
            {
                name: 'paho_mqtt', src: 'https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.1.0/paho-mqtt.min.js'
            }
        ];
        this.ScriptStore.forEach(function (script) {
            _this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }
    // load script
    MQTTService.prototype._load = function () {
        var _this = this;
        var scripts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scripts[_i] = arguments[_i];
        }
        var promises = [];
        scripts.forEach(function (script) { return promises.push(_this._loadScript(script)); });
        return Promise.all(promises);
    };
    MQTTService.prototype._loadScript = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //resolve if already loaded
            if (_this.scripts[name].loaded) {
                resolve({ name: name, loaded: true, status: 'Already Loaded' });
            }
            else {
                //load script
                var script_1 = document.createElement('script');
                script_1.type = 'text/javascript';
                script_1.src = _this.scripts[name].src;
                if (script_1.readyState) { //IE
                    script_1.onreadystatechange = function () {
                        if (script_1.readyState === "loaded" || script_1.readyState === "complete") {
                            script_1.onreadystatechange = null;
                            _this.scripts[name].loaded = true;
                            resolve({ name: name, loaded: true, status: 'Loaded', script: script_1, src: script_1.src });
                        }
                    };
                }
                else { //Others
                    script_1.onload = function () {
                        _this.scripts[name].loaded = true;
                        resolve({ name: name, loaded: true, status: 'Loaded', script: script_1, src: script_1.src });
                    };
                }
                script_1.onerror = function (error) { return resolve({ name: name, loaded: false, status: 'Loaded' }); };
                document.getElementsByTagName('head')[0].appendChild(script_1);
            }
        });
    };
    // mqtt
    // Load the paho-mqtt mqtt and create a client instance
    MQTTService.prototype.loadingMqtt = function (onConnectionLost, onMessageArrived, TOPIC, MQTT_CONFIG) {
        var _this = this;
        return this._load('paho_mqtt').then(function (data) {
            // set callback handlers
            _this.client = new Paho.Client(MQTT_CONFIG.host, Number(MQTT_CONFIG.port), MQTT_CONFIG.path || "/mqtt", MQTT_CONFIG.clientId);
            _this.client.onConnectionLost = onConnectionLost.bind(_this);
            _this.client.onMessageArrived = onMessageArrived.bind(_this);
            // client connect and subscribe
            // console.log(this.client);
            return _this.client.connect({ onSuccess: _this._onConnect.bind(_this, TOPIC) });
        }).catch(function (error) {
            console.log(error);
        });
    };
    ;
    MQTTService.prototype.publishMessage = function (topic, playload, qos, retained) {
        // console.log('msg, topic', topic, playload);
        var message = new Paho.Message(playload);
        message.topic = topic;
        qos ? message.qos = qos : undefined;
        qos ? message.retained = retained : undefined;
        this.client.publish(message);
    };
    ;
    MQTTService.prototype.sendMessage = function (topic, playload, qos, retained) {
        // console.log('msg, topic', topic, playload);
        var message = new Paho.Message(playload);
        message.topic = topic;
        qos ? message.qos = qos : undefined;
        qos ? message.retained = retained : undefined;
        this.client.send(message);
    };
    ;
    // called when the client connects
    MQTTService.prototype._onConnect = function (topic) {
        var _this = this;
        // Once a connection has been made, make a subscription and send a message.
        // console.log("onConnect");
        // subscribe the topic
        topic.forEach(function (tp) {
            _this.client.subscribe(tp);
        });
        return this.client;
    };
    MQTTService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MQTTService);
    return MQTTService;
}());
export { MQTTService };
//# sourceMappingURL=mqtt-provider.js.map