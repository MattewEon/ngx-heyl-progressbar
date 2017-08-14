import {Component, ElementRef, HostBinding, Input, ViewEncapsulation, AfterViewInit} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {ProgressbarConfig} from "./progressbar.config";

declare var $: any;

@Component({
	selector: "progress-container",
	template: "<ng-content></ng-content>",
	styleUrls: ["../css/style.css"],
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
export class ProgressbarComponent implements AfterViewInit {
	config: ProgressbarConfig = new ProgressbarConfig();

	public value: number = 0;
	public width: number = 0;

	color1: number;
	color2: number;
	color3: number;

	@Input("color1") set setColor1(value: number) {
		this.color1 = value;
		this.updateColorClass();
	}
	@Input("color2") set setColor2(value: number) {
		this.color2 = value;
		this.updateColorClass();
	}
	@Input("color3") set setColor3(value: number) {
		this.color3 = value;
		this.updateColorClass();
	}

	@HostBinding("class.default") colorClassDefault: boolean = true;
	@HostBinding("class.color1") colorClass1: boolean = false;
	@HostBinding("class.color2") colorClass2: boolean = false;
	@HostBinding("class.color3") colorClass3: boolean = false;
	@HostBinding("style.width") get getWidth(): string {
		return this.width + "%";
	}

	public progressText: string = "";

	constructor(private el: ElementRef) {
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
			this.updateColorClass();
		});
	}

	@Input("config")
	set setConfig(config: ProgressbarConfig) {
		this.config = config.copy();
		this.updateWidth();
		this.updateProgressText();
	}

	@Input("value")
	set setValue(value: number) {
		this.value = value;
		this.updateColorClass();
		this.updateWidth();
	}

	@Input()
	set max(max: number) {
		this.config.setMax(max);
		//this.updateStepSize();
		this.updateWidth();
	}

	@Input()
	set progressType(progresType: string) {
		this.config.setProgressType(<any>progresType);
		this.updateProgressText();
	}

	@Input()
	set hideTextZeroValue(value: boolean) {
		this.config.setHideTextZeroValue(value);
		this.updateProgressText();
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

	updateWidth() {
		this.width = (this.value / this.config.getMax()) * 100;
		this.updateProgressText();
	}

	updateProgressText() {
		switch (this.config.getProgressType()) {
			case "percent" :
				this.progressText = Math.round(this.width) + "%";
				break;
			case "percent-progressive":
				let i = setInterval(() => {
					this.progressText = Math.round(this.getProgressPercentWidth()) + "%";
				}, 50);
				setTimeout(() => {
					clearInterval(i);
				}, 2000);
				break;
			case "value" :
				this.progressText = this.value + " / " + this.config.getMax();
				break;
			default :
				this.progressText = "";
				break;
		}
	}

	private getProgressPercentWidth(): number {
		return $(this.el.nativeElement).width() / $(this.el.nativeElement.parentNode).width() * 100;
	}

	isProgressTextDisplayable(): boolean {
		if (this.config.getProgressType() == 'none') return false;
		if (this.config.hideTextZeroValue && this.value == 0) return false;

		return true;
	}
}