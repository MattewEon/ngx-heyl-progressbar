import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressbarComponent, ProgressContainerComponent} from "./lib/components/progressbar.component";
import {RadialProgressComponent} from "./lib/components/radial-progress.component";
import {AbstractProgressComponent} from "./lib/components/abstract-progress.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		AbstractProgressComponent,
		ProgressContainerComponent,
		ProgressbarComponent,
		RadialProgressComponent
	],
	exports: [
		ProgressContainerComponent,
		ProgressbarComponent,
		RadialProgressComponent
	]
})
export class ProgressbarModule {
}