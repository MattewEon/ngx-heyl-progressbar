import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProgressbarComponent} from "./components/progressbar.component";
import {RadialProgressComponent} from "./components/radial-progress.component";
import {ProgressContainerComponent} from "./components/progress-container.component";

export * from "./components/progressbar.component";
export * from "./components/radial-progress.component";
export * from "./progress.config";

@NgModule({
  declarations: [
    ProgressContainerComponent,
    ProgressbarComponent,
    RadialProgressComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProgressContainerComponent,
    ProgressbarComponent,
    RadialProgressComponent
  ]
})
export class ProgressbarModule {
}
