import { OperatorTypes } from '../engine/models/operator.model';

export enum OperatorName {
  Map = 'map',
  Delay = 'delay',
  Take = 'take',
  TakeLast = 'takeLast',
  Skip = 'skip',
  SkipLast = 'skipLast',
  ElementAt = 'elementAt',
  BufferCount = 'bufferCount',
  WindowCount = 'windowCount',
  Retry = 'retry',
  BufferTime = 'bufferTime',
  WindowTime = 'windowTime',
  DebounceTime = 'debounceTime',
  ThrottleTime = 'throttleTime',
  AuditTime = 'auditTime',
  SampleTime = 'sampleTime',
  Filter = 'filter',
  TakeWhile = 'takeWhile',
  SkipWhile = 'skipWhile',
  Every = 'every',
  Find = 'find',
  FindIndex = 'findIndex',
  MapTo = 'mapTo',
  StartWith = 'startWith',
  DefaultIfEmpty = 'defaultIfEmpty',
  Scan = 'scan',
  SwitchScan = 'switchScan',
  MergeScan = 'mergeScan',
  Reduce = 'reduce',
  MergeMap = 'mergeMap',
  SwitchMap = 'switchMap',
  ConcatMap = 'concatMap',
  ExhaustMap = 'exhaustMap',
  Buffer = 'buffer',
  Window = 'window',
  TakeUntil = 'takeUntil',
  SkipUntil = 'skipUntil',
  WithLatestFrom = 'withLatestFrom',
  SequenceEqual = 'sequenceEqual',
  Pairwise = 'pairwise',
  First = 'first',
  Last = 'last',
  Distinct = 'distinct',
  DistinctUntilChanged = 'distinctUntilChanged',
  IgnoreElements = 'ignoreElements',
  MergeAll = 'mergeAll',
  ConcatAll = 'concatAll',
  SwitchAll = 'switchAll',
  ExhaustAll = 'exhaustAll',
  CombineLatestAll = 'combineLatestAll',
  Share = 'share',
  Timestamp = 'timestamp',
  TimeInterval = 'timeInterval',
  Materialize = 'materialize',
  Dematerialize = 'dematerialize',
  ToArray = 'toArray',
  IsEmpty = 'isEmpty',
  Count = 'count',
  Min = 'min',
  Max = 'max',
}

export interface OperatorInfo {
  name: OperatorName;
  description: string;
  disabled: boolean;
}

export const TRANSFORMATION_OPERATORS = [
  {
    name: OperatorName.Map,
    description: 'Applies an arithmetic operation to every emitted value.',
    disabled: false,
  },
  {
    name: OperatorName.MapTo,
    description: 'Replaces every emitted value with a constant value.',
    disabled: false,
  },
  {
    name: OperatorName.Pairwise,
    description: 'Emits the previous and current values together as a pair.',
    disabled: true,
  },
  {
    name: OperatorName.Scan,
    description: 'Accumulates over the stream, emitting each intermediate result.',
    disabled: false,
  },
  {
    name: OperatorName.SwitchScan,
    description: 'Like scan, but switches to the latest inner accumulation.',
    disabled: false,
  },
  {
    name: OperatorName.MergeScan,
    description: 'Like scan, but merges all inner accumulations concurrently.',
    disabled: false,
  },
  {
    name: OperatorName.MergeMap,
    description: 'Maps each value to an inner stream and merges them concurrently.',
    disabled: false,
  },
  {
    name: OperatorName.SwitchMap,
    description: 'Maps each value to an inner stream, switching to the latest.',
    disabled: false,
  },
  {
    name: OperatorName.ConcatMap,
    description: 'Maps each value to an inner stream, running them in order.',
    disabled: false,
  },
  {
    name: OperatorName.ExhaustMap,
    description: 'Maps to an inner stream, ignoring new values while one runs.',
    disabled: false,
  },
  {
    name: OperatorName.Buffer,
    description: 'Buffers values until the notifier stream emits.',
    disabled: true,
  },
  {
    name: OperatorName.BufferCount,
    description: 'Buffers values and emits them once the count is reached.',
    disabled: false,
  },
  {
    name: OperatorName.BufferTime,
    description: 'Buffers values and emits them every given interval (ms).',
    disabled: false,
  },
  {
    name: OperatorName.Window,
    description: 'Splits the stream into nested streams driven by a notifier.',
    disabled: true,
  },
  {
    name: OperatorName.WindowCount,
    description: 'Splits the stream into nested streams of a fixed count.',
    disabled: false,
  },
  {
    name: OperatorName.WindowTime,
    description: 'Splits the stream into nested streams by time window (ms).',
    disabled: false,
  },
];

export const FILTERING = [
  {
    name: OperatorName.First,
    description: 'Emits only the first value the source produces.',
    disabled: true,
  },
  {
    name: OperatorName.Last,
    description: 'Emits only the last value before the source completes.',
    disabled: true,
  },
  {
    name: OperatorName.Distinct,
    description: 'Emits a value only if it has never been emitted before.',
    disabled: true,
  },
  {
    name: OperatorName.DistinctUntilChanged,
    description: 'Emits a value only when it differs from the previous one.',
    disabled: true,
  },
  {
    name: OperatorName.IgnoreElements,
    description: 'Drops every value, forwarding only complete and error.',
    disabled: true,
  },
  {
    name: OperatorName.Filter,
    description: 'Emits only values that satisfy the comparison condition.',
    disabled: false,
  },
  {
    name: OperatorName.TakeWhile,
    description: 'Emits values while the condition holds, then completes.',
    disabled: false,
  },
  {
    name: OperatorName.SkipWhile,
    description: 'Skips values while the condition holds, then emits the rest.',
    disabled: false,
  },
  {
    name: OperatorName.Take,
    description: 'Emits the first N values, then completes.',
    disabled: false,
  },
  {
    name: OperatorName.TakeLast,
    description: 'Emits the last N values once the source completes.',
    disabled: false,
  },
  {
    name: OperatorName.Skip,
    description: 'Skips the first N values, then emits the rest.',
    disabled: false,
  },
  {
    name: OperatorName.SkipLast,
    description: 'Skips the last N values before completion.',
    disabled: false,
  },
  {
    name: OperatorName.ElementAt,
    description: 'Emits only the value at the given index.',
    disabled: false,
  },
  {
    name: OperatorName.TakeUntil,
    description: 'Emits values until the notifier stream emits.',
    disabled: true,
  },
  {
    name: OperatorName.SkipUntil,
    description: 'Skips values until the notifier stream emits.',
    disabled: true,
  },
  {
    name: OperatorName.DebounceTime,
    description: 'Emits a value only after the given quiet period (ms).',
    disabled: false,
  },
  {
    name: OperatorName.ThrottleTime,
    description: 'Emits a value, then ignores others for the given time (ms).',
    disabled: false,
  },
  {
    name: OperatorName.AuditTime,
    description: 'Emits the most recent value after the given duration (ms).',
    disabled: false,
  },
  {
    name: OperatorName.SampleTime,
    description: 'Emits the most recent value at fixed time intervals (ms).',
    disabled: false,
  },
];

export const JOIN = [
  {
    name: OperatorName.MergeAll,
    description: 'Subscribes to every inner Observable concurrently.',
    disabled: true,
  },
  {
    name: OperatorName.ConcatAll,
    description: 'Subscribes to each inner Observable one after another.',
    disabled: true,
  },
  {
    name: OperatorName.SwitchAll,
    description: 'Switches to the latest inner Observable, dropping the previous.',
    disabled: true,
  },
  {
    name: OperatorName.ExhaustAll,
    description: 'Ignores new inner Observables while one is still active.',
    disabled: true,
  },
  {
    name: OperatorName.CombineLatestAll,
    description: 'Combines the latest value from every inner Observable.',
    disabled: true,
  },
  {
    name: OperatorName.StartWith,
    description: 'Emits a starting value before the source values.',
    disabled: false,
  },
  {
    name: OperatorName.WithLatestFrom,
    description: 'Combines each value with the latest from another stream.',
    disabled: true,
  },
];

export const ERROR_HANDLING = [
  {
    name: OperatorName.Retry,
    description: 'Resubscribes to the source up to N times on error.',
    disabled: false,
  },
];

export const MULTICASTING = [
  {
    name: OperatorName.Share,
    description: 'Shares one underlying subscription among all subscribers.',
    disabled: true,
  },
];

export const UTILITY = [
  {
    name: OperatorName.Delay,
    description: 'Delays each emission by the given number of milliseconds.',
    disabled: false,
  },
  {
    name: OperatorName.Timestamp,
    description: 'Attaches an emission timestamp to each value.',
    disabled: true,
  },
  {
    name: OperatorName.TimeInterval,
    description: 'Reports the time elapsed since the previous emission.',
    disabled: true,
  },
  {
    name: OperatorName.Materialize,
    description: 'Wraps next/error/complete into Notification objects.',
    disabled: true,
  },
  {
    name: OperatorName.Dematerialize,
    description: 'Unwraps Notification objects back into real emissions.',
    disabled: true,
  },
  {
    name: OperatorName.ToArray,
    description: 'Buffers all values and emits them as one array on complete.',
    disabled: true,
  },
];

export const CONDITIONAL_AND_BOOLEAN = [
  {
    name: OperatorName.IsEmpty,
    description: 'Emits true if the source completes without emitting.',
    disabled: true,
  },
  {
    name: OperatorName.DefaultIfEmpty,
    description: 'Emits a default value if the source emits nothing.',
    disabled: false,
  },
  {
    name: OperatorName.Every,
    description: 'Emits true if every value satisfies the condition.',
    disabled: false,
  },
  {
    name: OperatorName.Find,
    description: 'Emits the first value that satisfies the condition.',
    disabled: false,
  },
  {
    name: OperatorName.FindIndex,
    description: 'Emits the index of the first value satisfying the condition.',
    disabled: false,
  },
  {
    name: OperatorName.SequenceEqual,
    description: 'Emits true if the source matches another stream exactly.',
    disabled: true,
  },
];

export const MATHEMATICAL_AND_AGGREGATE = [
  {
    name: OperatorName.Count,
    description: 'Emits how many values the source emitted.',
    disabled: true,
  },
  {
    name: OperatorName.Min,
    description: 'Emits the smallest value the source emitted.',
    disabled: true,
  },
  {
    name: OperatorName.Max,
    description: 'Emits the largest value the source emitted.',
    disabled: true,
  },
  {
    name: OperatorName.Reduce,
    description: 'Accumulates over the stream, emitting one final result.',
    disabled: false,
  },
];
export const OPERATORS_BY_TYPE: Record<OperatorTypes, OperatorInfo[]> = {
  [OperatorTypes.Transformation]: TRANSFORMATION_OPERATORS,
  [OperatorTypes.Filtering]: FILTERING,
  [OperatorTypes.Join]: JOIN,
  [OperatorTypes.ErrorHandling]: ERROR_HANDLING,
  [OperatorTypes.Multicasting]: MULTICASTING,
  [OperatorTypes.Utility]: UTILITY,
  [OperatorTypes.ConditionalAndBoolean]: CONDITIONAL_AND_BOOLEAN,
  [OperatorTypes.MathematicalAndAggregate]: MATHEMATICAL_AND_AGGREGATE,
};
