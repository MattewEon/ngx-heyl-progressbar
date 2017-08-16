import {AfterViewInit, Component, HostBinding, Input} from "@angular/core";
import {ProgressConfig} from "./progress.config";

@Component({
	selector: "",
	template: ""
})
export class AbstractProgressComponent implements AfterViewInit {
	@HostBinding("class.default") colorClassDefault: boolean = true;
	@HostBinding("class.color1") colorClass1: boolean = false;
	@HostBinding("class.color2") colorClass2: boolean = false;
	@HostBinding("class.color3") colorClass3: boolean = false;

	color1: number;
	color2: number;
	color3: number;

	@Input("color1")
	set setColor1(value: number) {
		this.color1 = value;
		this.updateColorClass();
	}

	@Input("color2")
	set setColor2(value: number) {
		this.color2 = value;
		this.updateColorClass();
	}

	@Input("color3")
	set setColor3(value: number) {
		this.color3 = value;
		this.updateColorClass();
	}

	@Input("value")
	set inputValue(value: number) {
		this.setValue(value);
	}

	setValue(value: number) {
		this.value = value;
		this.onSetValue();
	}

	@Input("config")
	set setConfig(config: ProgressConfig) {
		this.config = config.copy();
		this.onSetValue();
	}

	@Input()
	set max(max: number) {
		this.config.setMax(max);
		this.onSetValue();
	}

	@Input()
	set progressType(progresType: string) {
		this.config.setProgressType(<any>progresType);
		this.onSetValue();
	}

	@Input()
	set hideTextZeroValue(value: boolean) {
		this.config.setHideTextZeroValue(value);
		this.updateProgressText();
	}


	value: number = 0;
	config: ProgressConfig = new ProgressConfig();
	public progressText: string = "";

	constructor() {
		this.color1 = 100;
		this.color2 = 100;
		this.color3 = 100;

		if ($ == undefined) {
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = "http://code.jquery.com/jquery-3.2.1.min.js";
			script.integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=";
			//script.crossOrigin = "anonymous";
		}
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.onSetValue();
		});
	}


	updateColorClass() {
		this.colorClassDefault = false;
		this.colorClass1 = false;
		this.colorClass2 = false;
		this.colorClass3 = false;

		if (this.value / this.config.max * 100 > this.color3) this.colorClass3 = true;
		else if (this.value / this.config.max * 100 > this.color2) this.colorClass2 = true;
		else if (this.value / this.config.max * 100 > this.color1) this.colorClass1 = true;
		else this.colorClassDefault = true;
	}

	public onSetValue() {

	}

	public getValuePercent(): number {
		return this.value / this.config.max * 100;
	}

	updateProgressText() {
		switch (this.config.getProgressType()) {
			case "percent" :
				this.progressText = Math.round(this.getValuePercent()) + "%";
				break;
			case "percent-progressive":
				let i = setInterval(() => {
					this.progressText = Math.round(this.getDisplayedValuePercent()) + "%";
				}, 50);
				setTimeout(() => {
					clearInterval(i);
				}, 1000);
				break;
			case "value" :
				this.progressText = this.value + " / " + this.config.getMax();
				break;
			case "value-progressive" :
				let j = setInterval(() => {
					this.progressText = this.getDisplayedValue() + " / " + this.config.max;
				}, 50);
				setTimeout(() => {
					clearInterval(i);
				}, 1000);
				break;
			default :
				this.progressText = "";
				break;
		}
	}

	protected getDisplayedValuePercent(): number {
		return 0;
	}

	protected getDisplayedValue(): number {
		return 0;
	}

	isProgressTextDisplayable(): boolean {
		if (this.config.getProgressType() == 'none') return false;
		if (this.config.hideTextZeroValue && this.value == 0) return false;

		return true;
	}
}