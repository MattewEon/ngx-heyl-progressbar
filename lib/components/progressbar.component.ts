import {Component, Input, ViewEncapsulation, HostBinding} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
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

	@HostBinding("style.background-size") backgroundSize: string = "10%";

	private progressText: string = "";
	private _progressType: ProgressType = "none";

	constructor(private domSan: DomSanitizer) {

	}

	@Input() set value(value: number) {
		this._value = value;
		this.updateWidth();
	}

	@Input() set max(max: number) {
		this._max = max;

		let size = (100 / max);
		while (size < 3) size *= 2;

		this.backgroundSize = this.domSan.bypassSecurityTrustStyle(`calc(` + size + `% + 1px)`);
		this.updateWidth();
	}

	@Input() set progressType(progresType: ProgressType) {
		this._progressType = progresType;
		this.updateProgressText();
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