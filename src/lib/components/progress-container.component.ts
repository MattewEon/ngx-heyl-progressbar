import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Component, HostBinding, Input, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "progress-container",
  template: "<ng-content></ng-content>",
  styleUrls: ["../css/progressbar.css"],
  encapsulation: ViewEncapsulation.None
})
export class ProgressContainerComponent {
  @HostBinding("style.background-size") backgroundSize: SafeStyle | string = "10%";

  step: number = 25;

  @Input("step")
  set setStep(value: number) {
    this.step = 100 / value;
    while (this.step < 3) this.step *= 2;
    this.updateStepSize();
  }

  @Input("force-step")
  set forceStep(value: number) {
    this.step = 100 / value;
    this.updateStepSize();
  }

  constructor(private domSan: DomSanitizer) {
    this.updateStepSize();
  }

  updateStepSize() {
    this.backgroundSize = this.domSan.bypassSecurityTrustStyle(`calc(` + this.step + `% + 1px)`);
  }

}
