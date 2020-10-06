export class Animation {
  start;
  end;
  onStart;
  onProgress;
  onEnd;

  constructor(
    { delay = 0, duration = 0, onStart, onProgress, onEnd }
  ) {
    this.start = delay +  Date.now();
    this.end = this.start + duration;
    this.onStart = onStart;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
  }
}
