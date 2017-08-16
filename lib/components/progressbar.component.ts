import {AfterViewInit, Component, ElementRef, HostBinding, Input, ViewEncapsulation} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {AbstractProgressComponent} from "./abstract-progress.component";

declare var $: any;

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

@Component({
	selector: "progressbar",
	templateUrl: "progressbar.component.html",
})
export class ProgressbarComponent extends AbstractProgressComponent {
	public width: number = 0;

	@HostBinding("style.width")
	get getWidth(): string {
		return this.width + "%";
	}

	constructor(private el: ElementRef) {
		super();
	}

	onSetValue() {
		this.updateColorClass();
		this.updateWidth();
	}


	updateWidth() {
		this.width = this.getValuePercent();
		this.updateProgressText();
	}

	protected getDisplayedValuePercent(): number {
		return $(this.el.nativeElement).width() / $(this.el.nativeElement.parentNode).width() * 100;
	}

	protected getDisplayedValue(): number {
		return Math.round(this.getDisplayedValuePercent() / 100 * this.config.max);
	}
}