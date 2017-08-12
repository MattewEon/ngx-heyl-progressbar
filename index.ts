import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressbarComponent, ProgressContainerComponent} from "./lib/components/progressbar.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ProgressContainerComponent,
		ProgressbarComponent
	],
	exports: [
		ProgressContainerComponent,
		ProgressbarComponent
	]
})
export class ProgressbarModule {
}