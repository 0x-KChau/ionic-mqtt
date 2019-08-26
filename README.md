# ionic-mqtt

## Introduction
This is a simple ionic wrapper of paho-mqtt. For more detail of paho-mqtt, please refer to this [paho-mqtt github page](https://github.com/eclipse/paho.mqtt.javascript#readme).

## Get Started

### Installation

```
npm install ionic-mqtt --save
```

### Example Usage
```

// inside your app.module.ts

...
import { IonicMqttModule, MQTTService } from 'ionic-mqtt';

@NgModule({
  ...,
  imports: [
    ...,
    IonicMqttModule
  ],
  providers: [
    ...,
    MQTTService
  ],
});

export class AppModule {}

```

```  

// inside your component page

import { MQTTService } from 'ionic-mqtt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private _mqttClient: any;

  private MQTT_CONFIG: {
    host: string,
    port: number,
    clientId: string,
  } = {
    host: "test.mosquitto.org",
    port: 8081,
    clientId: "mqtt",
  };

  private TOPIC: string[] = [];

  constructor(public navCtrl: NavController, private mqttService: MQTTService) {
    this._mqttClient = this.mqttService.client;
  }

  ngOnInit() {
    this._mqttClient = this.mqttService.loadingMqtt(this._onConnectionLost, this._onMessageArrived, this.TOPIC, this.MQTT_CONFIG);
  }

  private _onConnectionLost(responseObject) {
    // connection listener
    // ...do actions when connection lost
  }

  private _onMessageArrived(message) {
    // message listener
    // ...do actions with arriving message
  }

  ...

}

```

The above example uses the [Mosquitto broder/server](https://test.mosquitto.org/), if you want to run your own localhost MQTT broker, you can use [Mosquitto](https://mosquitto.org/) or [Mosca](http://www.mosca.io/), to launch your own broker. Remember to change the host, port and clientId to your localhost server respectively.


### API

#### MQTTService.loadingMqtt(connection_callback, message_callback, topic, configurations)
* connection_callback
** callback function (response) {}
  called when a connection has been lost. after a connect() method has succeeded. Establish the call back used when a connection has been lost. The connection may be lost because the client initiates a disconnect or because the server or network cause the client to be disconnected. The disconnect call back may be called without the connectionComplete call back being invoked if, for example the client fails to connect. A single response object parameter is passed to the onConnectionLost callback containing the following fields:
  1. errorCode
  2. errorMessage

* message_callback
** callback function (message) {}
  called when a message has arrived in this Paho.MQTT.client. Parameters passed to the onMessageArrived callback are:
  1. Paho.MQTT.Message that has arrived.

* topic
** string
  mandatory The name of the topic to which the message is to be published. - If it is the only parameter, used as Paho.MQTT.Message object.

* configurations
** {
  host:	string	= the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
  port:	number = the port number to connect to - only required if host is not a URI
  path:	string = the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
  clientId:	string = the Messaging client identifier, between 1 and 23 characters in length.
  }

### Usage with Ionic

#### Pre-requisites
Before you can begin using these mqtt service with your project, you need to make sure your project meets a few of these requirements:

"typescript" >= 2.6.2
"ionic-angular" >= 3.9
"@ionic/app-scripts" >= 3.2.2
"@angular/core" >= 5.2.11


### Contributing
This ionic-mqtt wrapper is an Open Source Package. So it is open to any contributors.


### License
MIT
