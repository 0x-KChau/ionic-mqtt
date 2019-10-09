import { NgModule, ModuleWithProviders } from '@angular/core';
// import { MqttComponent } from './components/mqtt-component';
import { MQTTService } from './providers/mqtt-provider';
import { IonicModule } from '@ionic/angular';

@NgModule({
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

export class IonicMqttModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicMqttModule,
            providers: [MQTTService]
        };
    }
}
