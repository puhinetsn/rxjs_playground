import {
  audit,
  auditTime,
  buffer,
  bufferCount,
  bufferTime,
  combineLatestAll,
  concatAll,
  concatMap,
  count,
  debounceTime,
  defaultIfEmpty,
  delay,
  dematerialize,
  distinct,
  distinctUntilChanged,
  elementAt,
  every,
  exhaustAll,
  exhaustMap,
  filter,
  find,
  findIndex,
  first,
  ignoreElements,
  isEmpty,
  last,
  map,
  mapTo,
  materialize,
  max,
  mergeAll,
  mergeMap,
  mergeScan,
  min,
  OperatorFunction,
  pairwise,
  reduce,
  retry,
  sampleTime,
  scan,
  sequenceEqual,
  share,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  switchAll,
  switchMap,
  switchScan,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
  timeInterval,
  timestamp,
  toArray,
  window,
  windowCount,
  windowTime,
} from 'rxjs';
import { Subject } from 'rxjs';
import { OperatorName } from '../../data/operators';
import {
  AccumulatorOperatorOptions,
  ComparisonOperatorOptions,
  ComparisonOperators,
  HigherOrderMapOptions,
  NumericOperators,
  Operator,
  ValueOperatorOptions,
} from '../models/operator.model';
import { EmittedValue } from '../execution/execution';

// Wraps a raw number back into the EmittedValue shape with a fresh id.
function wrap(value: number): EmittedValue {
  return { id: crypto.randomUUID(), value };
}

export function parsePipeOperator(
  pipe: Operator,
  onMessage: (message: number) => void,
): OperatorFunction<EmittedValue, EmittedValue> {
  switch (pipe.name) {
    case OperatorName.Map: {
      const options = pipe.options as AccumulatorOperatorOptions;
      return map((ev: EmittedValue) =>
        wrap(applyOperator(ev.value, options.operator, options.seed)),
      );
    }
    case OperatorName.MapTo: {
      const options = pipe.options as ValueOperatorOptions;
      return map(() => wrap(options.value));
    }
    // case OperatorName.Pairwise: {
    //   return pairwise();
    // }
    case OperatorName.Scan: {
      const options = pipe.options as AccumulatorOperatorOptions;
      return scan(
        (acc: EmittedValue, val: EmittedValue) =>
          wrap(applyOperator(val.value, options.operator, acc.value)),
        wrap(options.seed),
      );
    }
    case OperatorName.SwitchScan: {
      const options = pipe.options as AccumulatorOperatorOptions;
      return switchScan(
        (acc: EmittedValue, val: EmittedValue) => new Subject<EmittedValue>(),
        wrap(options.seed),
      );
    }
    case OperatorName.MergeScan: {
      const options = pipe.options as AccumulatorOperatorOptions;
      return mergeScan(
        (acc: EmittedValue, val: EmittedValue) => new Subject<EmittedValue>(),
        wrap(options.seed),
      );
    }
    case OperatorName.Reduce: {
      const options = pipe.options as AccumulatorOperatorOptions;
      return reduce(
        (acc: EmittedValue, val: EmittedValue) =>
          wrap(applyOperator(val.value, options.operator, acc.value)),
        wrap(options.seed),
      );
    }
    case OperatorName.MergeMap: {
      const options = pipe.options as HigherOrderMapOptions;
      return mergeMap((val: EmittedValue) => new Subject<EmittedValue>());
    }
    case OperatorName.SwitchMap: {
      return switchMap((val: EmittedValue) => new Subject<EmittedValue>());
    }
    case OperatorName.ConcatMap: {
      return concatMap((val: EmittedValue) => new Subject<EmittedValue>());
    }
    case OperatorName.ExhaustMap: {
      return exhaustMap((val: EmittedValue) => new Subject<EmittedValue>());
    }
    // case OperatorName.BufferCount: {
    //   const options = pipe.options as ValueOperatorOptions;
    //   return bufferCount(options.value);
    // }
    // case OperatorName.BufferTime: {
    //   const options = pipe.options as ValueOperatorOptions;
    //   return bufferTime(options.value);
    // }
    // case OperatorName.Buffer: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return buffer(notifiers[options.notifierId]);
    // }
    // case OperatorName.WindowCount: {
    //   const options = pipe.options as ValueOperatorOptions;
    //   return windowCount(options.value);
    // }
    // case OperatorName.WindowTime: {
    //   const options = pipe.options as ValueOperatorOptions;
    //   return windowTime(options.value);
    // }
    // case OperatorName.Window: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return window(notifiers[options.notifierId]);
    // }

    // --- Filtering ---
    case OperatorName.First: {
      return first();
    }
    case OperatorName.Last: {
      return last();
    }
    case OperatorName.Distinct: {
      // dedupe by the numeric value, not by object identity (every EmittedValue has a unique id)
      return distinct((ev: EmittedValue) => ev.value);
    }
    case OperatorName.DistinctUntilChanged: {
      return distinctUntilChanged(
        (prev: EmittedValue, curr: EmittedValue) => prev.value === curr.value,
      );
    }
    case OperatorName.IgnoreElements: {
      return ignoreElements();
    }
    case OperatorName.Filter: {
      const options = pipe.options as ComparisonOperatorOptions;
      return filter((ev: EmittedValue) =>
        applyComparison(ev.value, options.operator, options.value),
      );
    }
    case OperatorName.TakeWhile: {
      const options = pipe.options as ComparisonOperatorOptions;
      return takeWhile((ev: EmittedValue) =>
        applyComparison(ev.value, options.operator, options.value),
      );
    }
    case OperatorName.SkipWhile: {
      const options = pipe.options as ComparisonOperatorOptions;
      return skipWhile((ev: EmittedValue) =>
        applyComparison(ev.value, options.operator, options.value),
      );
    }
    // case OperatorName.Every: {
    //   const options = pipe.options as ComparisonOperatorOptions;
    //   return every((ev: EmittedValue) => applyComparison(ev.value, options.operator, options.value));
    // }
    // case OperatorName.Find: {
    //   const options = pipe.options as ComparisonOperatorOptions;
    //   return find((ev: EmittedValue) => applyComparison(ev.value, options.operator, options.value));
    // }
    case OperatorName.FindIndex: {
      const options = pipe.options as ComparisonOperatorOptions;
      // findIndex emits a raw number (the index) — wrap it back into EmittedValue
      return (source) =>
        source.pipe(
          findIndex((ev: EmittedValue) =>
            applyComparison(ev.value, options.operator, options.value),
          ),
          map((idx: number) => wrap(idx)),
        );
    }
    case OperatorName.Take: {
      const options = pipe.options as ValueOperatorOptions;
      return take(options.value);
    }
    case OperatorName.TakeLast: {
      const options = pipe.options as ValueOperatorOptions;
      return takeLast(options.value);
    }
    case OperatorName.Skip: {
      const options = pipe.options as ValueOperatorOptions;
      return skip(options.value);
    }
    case OperatorName.SkipLast: {
      const options = pipe.options as ValueOperatorOptions;
      return skipLast(options.value);
    }
    case OperatorName.ElementAt: {
      const options = pipe.options as ValueOperatorOptions;
      return elementAt(options.value);
    }
    // case OperatorName.TakeUntil: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return takeUntil(notifiers[options.notifierId]);
    // }
    // case OperatorName.SkipUntil: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return skipUntil(notifiers[options.notifierId]);
    // }
    case OperatorName.DebounceTime: {
      const options = pipe.options as ValueOperatorOptions;
      return debounceTime(options.value);
    }
    case OperatorName.ThrottleTime: {
      const options = pipe.options as ValueOperatorOptions;
      return throttleTime(options.value);
    }
    case OperatorName.AuditTime: {
      const options = pipe.options as ValueOperatorOptions;
      return auditTime(options.value);
    }
    case OperatorName.SampleTime: {
      const options = pipe.options as ValueOperatorOptions;
      return sampleTime(options.value);
    }

    // --- Join ---
    // case OperatorName.MergeAll:
    //   return mergeAll();
    // case OperatorName.ConcatAll:
    //   return concatAll();
    // case OperatorName.SwitchAll:
    //   return switchAll();
    // case OperatorName.ExhaustAll:
    //   return exhaustAll();
    // case OperatorName.CombineLatestAll:
    //   return combineLatestAll();
    case OperatorName.StartWith: {
      const options = pipe.options as ValueOperatorOptions;
      return startWith(wrap(options.value));
    }
    // case OperatorName.WithLatestFrom: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return mergeMap((val: EmittedValue) => notifiers[options.notifierId]);
    // }
    // case OperatorName.SequenceEqual: {
    //   const options = pipe.options as NotifierOperatorOptions;
    //   return sequenceEqual(notifiers[options.notifierId]);
    // }

    // --- Error handling ---
    case OperatorName.Retry: {
      const options = pipe.options as ValueOperatorOptions;
      return retry(options.value);
    }

    // --- Multicasting ---
    case OperatorName.Share:
      return share();

    // --- Utility ---
    case OperatorName.Delay: {
      const options = pipe.options as ValueOperatorOptions;
      return delay(options.value);
    }
    case OperatorName.Tap: {
      return tap((ev: EmittedValue) => {
        (ev.value, onMessage(ev.value));
      });
    }

    // --- Conditional & boolean ---
    // case OperatorName.IsEmpty:
    //   return isEmpty();
    case OperatorName.DefaultIfEmpty: {
      const options = pipe.options as ValueOperatorOptions;
      return defaultIfEmpty(wrap(options.value));
    }

    // --- Mathematical & aggregate ---
    case OperatorName.Count: {
      // count() emits a raw number — wrap it back into EmittedValue
      return (source) =>
        source.pipe(
          count(),
          map((n: number) => wrap(n)),
        );
    }
    case OperatorName.Min:
      // min/max keep the original EmittedValue (with its id) that held the extreme value
      return min((a: EmittedValue, b: EmittedValue) => a.value - b.value);
    case OperatorName.Max:
      return max((a: EmittedValue, b: EmittedValue) => a.value - b.value);

    default:
      throw new Error(`Unknown operator: ${pipe.name}`);
  }
}

function applyOperator(num: number, operator: NumericOperators, seed: number): number {
  switch (operator) {
    case NumericOperators.PLUS:
      return num + seed;
    case NumericOperators.MINUS:
      return num - seed;
    case NumericOperators.MULTIPLY:
      return num * seed;
    case NumericOperators.DIVIDE:
      return num / seed;
    default:
      return num;
  }
}

function applyComparison(num: number, operator: ComparisonOperators, value: number): boolean {
  switch (operator) {
    case ComparisonOperators.GREATER_THAN:
      return num > value;
    case ComparisonOperators.LESS_THAN:
      return num < value;
    case ComparisonOperators.GREATER_OR_EQUAL:
      return num >= value;
    case ComparisonOperators.LESS_OR_EQUAL:
      return num <= value;
    case ComparisonOperators.EQUAL:
      return num === value;
    case ComparisonOperators.NOT_EQUAL:
      return num !== value;
    default:
      return false;
  }
}
