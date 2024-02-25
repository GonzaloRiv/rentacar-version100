import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        AvatarModule,
        DividerModule
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
