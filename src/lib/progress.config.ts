export type ProgressValue = "none"| "percent" | "percent-progressive" | "value" | "value-progressive" | "ng-content";

export class ProgressConfig {
	max: number = 100;
	progressType: ProgressValue = "none";
	hideTextZeroValue: boolean = false;

	copy() {
		let copiedConfig = new ProgressConfig();
		copiedConfig
			.setMax(this.max)
			.setProgressType(this.progressType)
			.setHideTextZeroValue(this.hideTextZeroValue);

		return copiedConfig;
	}

	setMax(max: number): ProgressConfig {
		this.max = max;
		return this;
	}
	getMax(): number { return this.max; }

	setProgressType(progress: ProgressValue): ProgressConfig {
		this.progressType = progress;
		return this;
	}
	getProgressType(): ProgressValue { return this.progressType; }

	setHideTextZeroValue(hideTextZeroValue: boolean): ProgressConfig {
		this.hideTextZeroValue = hideTextZeroValue;
		return this;
	}
	getHideTextZeroValue(): boolean { return this.hideTextZeroValue; }
}

export function getRotationDegrees(obj): number {
	let matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform") ||
		obj.css("-ms-transform") ||
		obj.css("-o-transform") ||
		obj.css("transform");
	if (matrix !== 'none') {
		let values = matrix.split('(')[1].split(')')[0].split(',');
		let angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
		return (angle < 0) ? angle + 360 : angle;
	} else {
		return 0;
	}
}
