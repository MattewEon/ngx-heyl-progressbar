import {Component, Input, ViewEncapsulation} from "@angular/core";
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

	private progressText: string = "";
	private _progressType: ProgressType = "none";

	@Input() set value(value: number) {
		this._value = value;
		this.updateWidth();
	}

	@Input() set max(max: number) {
		this._max = max;
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
			case "percent" : this.progressText = this.width + " %"; break;
			case "value" : this.progressText = this._value + " / " + this._max; break;
		}
	}
}