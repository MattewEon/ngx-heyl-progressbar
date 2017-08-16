import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressbarComponent, ProgressContainerComponent} from "./lib/components/progressbar.component";
import {RadialProgressComponent} from "./lib/components/radial-progress.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
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