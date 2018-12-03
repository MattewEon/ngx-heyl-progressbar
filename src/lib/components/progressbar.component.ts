import {Component, ElementRef, HostBinding} from "@angular/core";
import {AbstractProgressComponent} from "./abstract-progress.component";

declare let $: any;

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
		let value = this.getDisplayedValuePercent() / 100 * this.config.max;
		return parseFloat(value.toFixed(this.roundValue));
	}
}
