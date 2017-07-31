export type ProgressValue = "none"| "percent" | "value" | "ng-content";

export class ProgressbarConfig {
	private max: number = 100;
	private step: number = 100;
	private autoStep: boolean = true;
	private stepSize: number;

	progressType: ProgressValue = "none";

	constructor() {
		this.refreshStepSize();
	}

	setMax(max: number): ProgressbarConfig {
		this.max = max;
		if (this.autoStep) this.step = max;
		this.refreshStepSize();
		return this;
	}
	getMax(): number { return this.max; }

	setStep(step: number): ProgressbarConfig {
		this.step = step;
		this.autoStep = false;
		this.refreshStepSize();
		return this;
	}
	setStepToMax() {
		this.step = this.max;
		this.refreshStepSize();
		this.autoStep = true;
	}
	getStep(): number { return this.step; }

	setProgressType(progress: ProgressValue): ProgressbarConfig {
		this.progressType = progress;
		return this;
	}
	getProgressType(): ProgressValue { return this.progressType; }

	private refreshStepSize() {
		this.stepSize = (100 / this.step);
		while (this.stepSize < 3) this.stepSize *= 2;

	}

	getStepSize(): number {
		return this.stepSize;
	}
}