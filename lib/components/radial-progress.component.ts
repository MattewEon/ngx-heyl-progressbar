import {Component, ElementRef, HostBinding, HostListener, Input, ViewEncapsulation} from "@angular/core";
import {AbstractProgressComponent} from "./abstract-progress.component";
import {getRotationDegrees} from "./progress.config";

declare let $: any;

@Component({
	selector: "radial-progress",
	templateUrl: "radial-progress.component.html",
	styleUrls: ["../css/radial-progress.css"],
	encapsulation: ViewEncapsulation.None
})
export class RadialProgressComponent extends AbstractProgressComponent {

	public halfLeftVisible: boolean = false;

	public transform1: string = "rotate(0deg)";
	public transform2: string = "rotate(0deg)";

	private timeoutChromeFix;

	constructor(private el: ElementRef) {
		super();
	}

	onSetValue() {
		this.halfLeftVisible = false;
		this.transform1 = "rotate(" + this.getValuePercent() * 1.8 + "deg)";
		this.transform2 = "rotate(" + this.getValuePercent() * 3.6 + "deg)";
		this.updateColorClass();
		this.updateProgressText();
		clearTimeout(this.timeoutChromeFix);

		if (this.value > 50 && this.value < 75) {
			// Chrome fix
			this.timeoutChromeFix = setTimeout(() => {
				this.halfLeftVisible = true;
			}, 900);
		}
	}

	protected getDisplayedValuePercent(): number {
		return Math.round(getRotationDegrees($(this.el.nativeElement).find(".half-left")) / 1.8);
	}

	protected getDisplayedValue(): number {
		return Math.round(this.getDisplayedValuePercent() / 100 * this.config.max);
	}
}