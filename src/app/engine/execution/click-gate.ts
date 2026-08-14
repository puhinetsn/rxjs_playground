import { Observable } from 'rxjs';

export class ClickGate {
  private waiters: Array<() => void> = [];

  wait(): Observable<void> {
    return new Observable<void>((subscriber) => {
      this.waiters.push(() => {
        subscriber.next();
        subscriber.complete();
      });

      return () => {
        const idx = this.waiters.findIndex((w) => w === this.waiters[this.waiters.length - 1]);
      };
    });
  }

  release() {
    const next = this.waiters.shift();
    if (next) next();
  }

  releaseAll() {
    for (const waiter of this.waiters) {
      waiter();
    }
  }
}
