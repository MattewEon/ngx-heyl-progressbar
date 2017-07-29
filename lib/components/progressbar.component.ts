import {Component, Input, ViewEncapsulation, HostBinding} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
export type ProgressType = "none" | "percent" | "value";

@Component({
	selector: "progressbar",
	templateUrl: "progressbar.component.html",
	styleUrls: ["../css/style.css"],
	encapsulation: ViewEncapsulation.None
})
export class ProgressbarComponent {
	private _value: number = 0;
	private _max: number = 100;
	private width: number = 0;
	private _step: number = 4;
	private autoStep: boolean = true;

	@HostBinding("style.background-size") backgroundSize: SafeStyle | string = "10%";

	private progressText: string = "";
	private _progressType: ProgressType = "none";

	constructor(private domSan: DomSanitizer) {
		this.setStep(this._step);
	}

	@Input() set value(value: number) {
		this._value = value;
		this.updateWidth();
	}

	@Input() set max(max: number) {
		this._max = max;

		if (this.autoStep) {
			this.setStep(this._max);
		}

		this.updateWidth();
	}

	@Input() set progressType(progresType: ProgressType) {
		this._progressType = progresType;
		this.updateProgressText();
	}

	@Input() set step(value: number) {
		this.setStep(value);
		this.autoStep = false;
	}

	setStep(value: number) {
		this._step = value;

		let size = (100 / this._step);
		while (size < 3) size *= 2;

		this.backgroundSize = this.domSan.bypassSecurityTrustStyle(`calc(` + size + `% + 1px)`);
	}

	updateWidth() {
		this.width = (this._value / this._max) * 100;
		this.updateProgressText();
	}

	updateProgressText() {
		switch (this._progressType) {
			case "none" : this.progressText = ""; break;
			case "percent" : this.progressText = Math.round(this.width) + " %"; break;
			case "value" : this.progressText = this._value + " / " + this._max; break;
		}
	}
}