# ionic-mqtt

## Intro

#### This is a simple ionic wrapper of paho-mqtt. For more detail of paho-mqtt, please refer to this [github page](https://github.com/eclipse/paho.mqtt.javascript#readme).

## Get Started

### Installation

` npm install ionic-mqtt --save `

### Example
```

// inside your app.module.ts

...
import { IonicMqttModule, MqttProvider } from 'ionic-mqtt';

@NgModule({
  ...,
  imports: [
    ...,
    IonicMqttModule
  ],
  providers: [
    ...,
    MqttProvider
  ],
})
export class AppModule {}

```

```  

// inside your component page

import { MqttProvider } from 'ionic-mqtt';

@Component({
  ...,
})

export class HomePage {

  ...

  private _mqttClient: any;

  private MQTT_CONFIG: {
    domain: string,
    port: number,
    cliendId: string,
    } = {
    domain: "xxx.xxx.x.xxx",
    port: xxxx,
    clientId: "xxxx",
  } // create your local mqtt server or remote server and get the required domain, port and clientId.

  constructor(private mqttProvider: MqttProvider) {
    this._mqttClient = this.mqttProvider.client;
  }

  ngOnInit() {
    this._mqttClient = MqttProvider.loadingMqtt(this._onConnectionLost, this._onMessageArrived, topic, MQTT_CONFIG);
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
