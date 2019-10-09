# ionic-mqtt

### **UPDATES: This package is being migrated to ionic v4.

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

// inside your component

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

  constructor(private mqttService: MQTTService) {
  }

  ngOnInit() {
    this._mqttClient = this.mqttService.loadingMqtt(this._onConnectionLost, this._onMessageArrived, this.TOPIC, this.MQTT_CONFIG);
  }

  private _onConnectionLost(responseObject) {
    // connection listener
    // ...do actions when connection lost
    console.log('_onConnectionLost', responseObject);
  }

  private _onMessageArrived(message) {
    // message listener
    // ...do actions with arriving message
    console.log('message', message);
  }

  ...


  // public function for sending and publishing mqtt messages

  public sendMessage() {
    console.log('sendMessage')
    this._mqttService.sendMessage(TOPIC, MESSAGE);
  }

  public publishMessage() {
    console.log('publishMessage')
    this._mqttService.publishMessage(TOPIC, MESSAGE);
  }

  ...

}

```



```
// inside your component html

<ion-content padding>

  ...

  <button (click)="sendMessage()">Send Message</button>
  <button (click)="publishMessage()">Publish Message</button>

  ...

</ion-content>

```

The above example uses the [Mosquitto broder/server](https://test.mosquitto.org/), if you want to run your own localhost MQTT broker, you can use [Mosquitto](https://mosquitto.org/) or [Mosca](http://www.mosca.io/), to launch your own broker. Remember to change the host, port and clientId to your localhost server respectively.


## API

### MQTTService.loadingMqtt(connection_callback, message_callback, topic(s), configurations)

#### * connection_callback

`callback function` (response) {}

> called when a connection has been lost. after a connect() method has succeeded. Establish the call back used when a connection has been lost. A single response object parameter is passed to the onConnectionLost callback containing the following fields:
  1. errorCode
  2. errorMessage

#### * message_callback

`callback function` (message) {}

> called when a message has arrived. Parameters passed to the onMessageArrived callback are:
  1. Paho.MQTT.Message

#### * topic(s)

`string[]`

> mandatory the array of the topics in string to which the message is to be published.

#### * configurations

`host:	string`

> the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.

`port:	number`

> the port number to connect to - only required if host is not a URI.

`path?:	string`

> the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.

`clientId:	string`

> the Messaging client identifier, between 1 and 23 characters in length.


### MQTTService.publishMessage(topic, playload, qos, retained)

> Publish a message to the consumers of the destination in the Message. Synonym for Paho.Mqtt.Client#send

`topic: string`

> mandatory the name of the topic to which the message is to be published.

`playload: string`

> The message data to be published.

`qos?: number`

> The Quality of Service used to deliver the message.
0 Best effort (default).
  1. At least once.
  2. Exactly once.

`retained?: boolean`

> If true, the message is to be retained by the server and delivered to both current and future subscriptions. If false the server only delivers the message to current subscribers, this is the default for new Messages.


## Usage with Ionic

### Pre-requisites
Before you can begin using these mqtt service with your project, you need to make sure your project meets a few of these requirements:

"typescript" >= 3.4.3

"@ionic-angular" >= 4.7.1

"@angular/core" >= 8.1.2


## Contributing
This ionic-mqtt wrapper is an Open Source Package. So it is open to any contributors.


## License
MIT
