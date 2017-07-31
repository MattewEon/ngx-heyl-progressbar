import {Component, HostBinding, Input, ViewEncapsulation} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {ProgressbarConfig} from "./progressbar.config";

@Component({
	selector: "progressbar",
	templateUrl: "progressbar.component.html",
	styleUrls: ["../css/style.css"],
	encapsulation: ViewEncapsulation.None
})
export class ProgressbarComponent {
	config: ProgressbarConfig = new ProgressbarConfig();

	private _value: number = 0;
	private width: number = 0;

	@Input() color1: number;
	@Input() color2: number;
	@Input() color3: number;

	@HostBinding("style.background-size") backgroundSize: SafeStyle | string = "10%";
	@HostBinding("class.default") colorClassDefault: boolean = true;
	@HostBinding("class.color1") colorClass1: boolean = false;
	@HostBinding("class.color2") colorClass2: boolean = false;
	@HostBinding("class.color3") colorClass3: boolean = false;

	private progressText: string = "";

	constructor(private domSan: DomSanitizer) {
		this.updateStepSize();
		this.color1 = 100;
		this.color2 = 100;
		this.color3 = 100;
	}

	@Input()
	set setConfig(config: ProgressbarConfig) {
		this.config = config;
		this.updateWidth();
		this.updateStepSize();
		this.updateProgressText();
	}

	@Input()
	set value(value: number) {
		this._value = value;
		this.updateColorClass();
		this.updateWidth();
	}

	@Input()
	set max(max: number) {
		this.config.setMax(max);
		this.updateStepSize();
		this.updateWidth();
	}

	@Input()
	set progressType(progresType: string) {
		this.config.setProgressType(<any>progresType);
		this.updateProgressText();
	}

	@Input()
	set step(value: number) {
		this.config.setStep(value);
		this.updateStepSize();
	}

	updateColorClass() {
		this.colorClassDefault = false;
		this.colorClass1 = false;
		this.colorClass2 = false;
		this.colorClass3 = false;

		if (this.width > this.color3) this.colorClass3 = true;
		else if (this.width > this.color2) this.colorClass2 = true;
		else if (this.width > this.color1) this.colorClass1 = true;
		else this.colorClassDefault = true;
	}

	updateStepSize() {
		console.log(this.config.getStepSize());
		this.backgroundSize = this.domSan.bypassSecurityTrustStyle(`calc(` + this.config.getStepSize() + `% + 1px)`);
	}

	updateWidth() {
		this.width = (this._value / this.config.getMax()) * 100;
		this.updateProgressText();
	}

	updateProgressText() {
		switch (this.config.getProgressType()) {
			case "percent" :
				this.progressText = Math.round(this.width) + " %";
				break;
			case "value" :
				this.progressText = this._value + " / " + this.config.getMax();
				break;
			default :
				this.progressText = "";
				break;
		}
	}
}