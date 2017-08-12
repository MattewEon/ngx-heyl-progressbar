export type ProgressValue = "none"| "percent" | "percent-progressive" | "value" | "ng-content";

export class ProgressbarConfig {
	max: number = 100;
	progressType: ProgressValue = "none";
	hideTextZeroValue: boolean = false;

	copy() {
		let copiedConfig = new ProgressbarConfig();
		copiedConfig
			.setMax(this.max)
			.setProgressType(this.progressType)
			.setHideTextZeroValue(this.hideTextZeroValue);

		return copiedConfig;
	}

	setMax(max: number): ProgressbarConfig {
		this.max = max;
		return this;
	}
	getMax(): number { return this.max; }

	setProgressType(progress: ProgressValue): ProgressbarConfig {
		this.progressType = progress;
		return this;
	}
	getProgressType(): ProgressValue { return this.progressType; }

	setHideTextZeroValue(hideTextZeroValue: boolean): ProgressbarConfig {
		this.hideTextZeroValue = hideTextZeroValue;
		return this;
	}
	getHideTextZeroValue(): boolean { return this.hideTextZeroValue; }
}