import { NgModule } from '@angular/core';
// import { MqttComponent } from './components/mqtt-component';
import { MQTTService } from './providers/mqtt-provider';
import { IonicModule } from 'ionic-angular';
var IonicMqttModule = (function () {
    function IonicMqttModule() {
    }
    IonicMqttModule.forRoot = function () {
        return {
            ngModule: IonicMqttModule,
            providers: [MQTTService]
        };
    };
    IonicMqttModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule
                    ],
                    declarations: [],
                    exports: []
                },] },
    ];
    /** @nocollapse */
    IonicMqttModule.ctorParameters = function () { return []; };
    return IonicMqttModule;
}());
export { IonicMqttModule };
//# sourceMappingURL=mqtt.module.js.map