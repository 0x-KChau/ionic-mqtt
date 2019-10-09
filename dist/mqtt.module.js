var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
// import { MqttComponent } from './components/mqtt-component';
import { MQTTService } from './providers/mqtt-provider';
import { IonicModule } from '@ionic/angular';
var IonicMqttModule = /** @class */ (function () {
    function IonicMqttModule() {
    }
    IonicMqttModule_1 = IonicMqttModule;
    IonicMqttModule.forRoot = function () {
        return {
            ngModule: IonicMqttModule_1,
            providers: [MQTTService]
        };
    };
    var IonicMqttModule_1;
    IonicMqttModule = IonicMqttModule_1 = __decorate([
        NgModule({
            imports: [
                // Only if you use elements like ion-content, ion-xyz...
                IonicModule
            ],
            declarations: [
            // declare all components that your module uses
            // MqttComponent
            ],
            exports: [
            // export the component(s) that you want others to be able to use
            // MqttComponent
            ]
        })
    ], IonicMqttModule);
    return IonicMqttModule;
}());
export { IonicMqttModule };
//# sourceMappingURL=mqtt.module.js.map