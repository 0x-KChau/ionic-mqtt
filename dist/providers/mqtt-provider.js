import { Injectable } from "@angular/core";
var MQTTService = (function () {
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
    // load script
    MQTTService.prototype._load = 
    // load script
    function () {
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
                if (script_1.readyState) {
                    //IE
                    script_1.onreadystatechange = function () {
                        if (script_1.readyState === "loaded" || script_1.readyState === "complete") {
                            script_1.onreadystatechange = null;
                            _this.scripts[name].loaded = true;
                            resolve({ name: name, loaded: true, status: 'Loaded', script: script_1, src: script_1.src });
                        }
                    };
                }
                else {
                    //Others
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
    // mqtt
    // Load the paho-mqtt mqtt and create a client instance
    MQTTService.prototype.loadingMqtt = 
    // mqtt
    // Load the paho-mqtt mqtt and create a client instance
    function (onConnectionLost, onMessageArrived, topic, MQTT_CONFIG) {
        var _this = this;
        return this._load('paho_mqtt').then(function (data) {
            // set callback handlers
            // set callback handlers
            _this.client = new Paho.Client(MQTT_CONFIG.domain, Number(MQTT_CONFIG.port), MQTT_CONFIG.clientId);
            _this.client.onConnectionLost = onConnectionLost.bind(_this);
            _this.client.onMessageArrived = onMessageArrived.bind(_this);
            // client connect and subscribe
            // console.log(this.client);
            return _this.client.connect({ onSuccess: _this._onConnect.bind(_this, topic) });
        }).catch(function (error) {
            console.log(error);
        });
    };
    ;
    // called when the client connects
    // called when the client connects
    MQTTService.prototype._onConnect = 
    // called when the client connects
    function (topic) {
        var _this = this;
        // Once a connection has been made, make a subscription and send a message.
        // console.log("onConnect");
        // subscribe the topic
        topic.forEach(function (tp) {
            _this.client.subscribe(tp);
        });
        return this.client;
    };
    MQTTService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MQTTService.ctorParameters = function () { return []; };
    return MQTTService;
}());
export { MQTTService };
//# sourceMappingURL=mqtt-provider.js.map