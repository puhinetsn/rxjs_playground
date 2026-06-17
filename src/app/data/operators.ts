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
}

export const TRANSFORMATION_OPERATORS = [
  {
    name: OperatorName.Map,
    description: 'Applies an arithmetic operation to every emitted value.',
  },
  {
    name: OperatorName.MapTo,
    description: 'Replaces every emitted value with a constant value.',
  },
  {
    name: OperatorName.Pairwise,
    description: 'Emits the previous and current values together as a pair.',
  },
  {
    name: OperatorName.Scan,
    description: 'Accumulates over the stream, emitting each intermediate result.',
  },
  {
    name: OperatorName.SwitchScan,
    description: 'Like scan, but switches to the latest inner accumulation.',
  },
  {
    name: OperatorName.MergeScan,
    description: 'Like scan, but merges all inner accumulations concurrently.',
  },
  {
    name: OperatorName.MergeMap,
    description: 'Maps each value to an inner stream and merges them concurrently.',
  },
  {
    name: OperatorName.SwitchMap,
    description: 'Maps each value to an inner stream, switching to the latest.',
  },
  {
    name: OperatorName.ConcatMap,
    description: 'Maps each value to an inner stream, running them in order.',
  },
  {
    name: OperatorName.ExhaustMap,
    description: 'Maps to an inner stream, ignoring new values while one runs.',
  },
  { name: OperatorName.Buffer, description: 'Buffers values until the notifier stream emits.' },
  {
    name: OperatorName.BufferCount,
    description: 'Buffers values and emits them once the count is reached.',
  },
  {
    name: OperatorName.BufferTime,
    description: 'Buffers values and emits them every given interval (ms).',
  },
  {
    name: OperatorName.Window,
    description: 'Splits the stream into nested streams driven by a notifier.',
  },
  {
    name: OperatorName.WindowCount,
    description: 'Splits the stream into nested streams of a fixed count.',
  },
  {
    name: OperatorName.WindowTime,
    description: 'Splits the stream into nested streams by time window (ms).',
  },
];

export const FILTERING = [
  { name: OperatorName.First, description: 'Emits only the first value the source produces.' },
  {
    name: OperatorName.Last,
    description: 'Emits only the last value before the source completes.',
  },
  {
    name: OperatorName.Distinct,
    description: 'Emits a value only if it has never been emitted before.',
  },
  {
    name: OperatorName.DistinctUntilChanged,
    description: 'Emits a value only when it differs from the previous one.',
  },
  {
    name: OperatorName.IgnoreElements,
    description: 'Drops every value, forwarding only complete and error.',
  },
  {
    name: OperatorName.Filter,
    description: 'Emits only values that satisfy the comparison condition.',
  },
  {
    name: OperatorName.TakeWhile,
    description: 'Emits values while the condition holds, then completes.',
  },
  {
    name: OperatorName.SkipWhile,
    description: 'Skips values while the condition holds, then emits the rest.',
  },
  { name: OperatorName.Take, description: 'Emits the first N values, then completes.' },
  {
    name: OperatorName.TakeLast,
    description: 'Emits the last N values once the source completes.',
  },
  { name: OperatorName.Skip, description: 'Skips the first N values, then emits the rest.' },
  { name: OperatorName.SkipLast, description: 'Skips the last N values before completion.' },
  { name: OperatorName.ElementAt, description: 'Emits only the value at the given index.' },
  { name: OperatorName.TakeUntil, description: 'Emits values until the notifier stream emits.' },
  { name: OperatorName.SkipUntil, description: 'Skips values until the notifier stream emits.' },
  {
    name: OperatorName.DebounceTime,
    description: 'Emits a value only after the given quiet period (ms).',
  },
  {
    name: OperatorName.ThrottleTime,
    description: 'Emits a value, then ignores others for the given time (ms).',
  },
  {
    name: OperatorName.AuditTime,
    description: 'Emits the most recent value after the given duration (ms).',
  },
  {
    name: OperatorName.SampleTime,
    description: 'Emits the most recent value at fixed time intervals (ms).',
  },
];

export const JOIN = [
  {
    name: OperatorName.MergeAll,
    description: 'Subscribes to every inner Observable concurrently.',
  },
  {
    name: OperatorName.ConcatAll,
    description: 'Subscribes to each inner Observable one after another.',
  },
  {
    name: OperatorName.SwitchAll,
    description: 'Switches to the latest inner Observable, dropping the previous.',
  },
  {
    name: OperatorName.ExhaustAll,
    description: 'Ignores new inner Observables while one is still active.',
  },
  {
    name: OperatorName.CombineLatestAll,
    description: 'Combines the latest value from every inner Observable.',
  },
  {
    name: OperatorName.StartWith,
    description: 'Emits a starting value before the source values.',
  },
  {
    name: OperatorName.WithLatestFrom,
    description: 'Combines each value with the latest from another stream.',
  },
];

export const ERROR_HANDLING = [
  { name: OperatorName.Retry, description: 'Resubscribes to the source up to N times on error.' },
];

export const MULTICASTING = [
  {
    name: OperatorName.Share,
    description: 'Shares one underlying subscription among all subscribers.',
  },
];

export const UTILITY = [
  {
    name: OperatorName.Delay,
    description: 'Delays each emission by the given number of milliseconds.',
  },
  { name: OperatorName.Timestamp, description: 'Attaches an emission timestamp to each value.' },
  {
    name: OperatorName.TimeInterval,
    description: 'Reports the time elapsed since the previous emission.',
  },
  {
    name: OperatorName.Materialize,
    description: 'Wraps next/error/complete into Notification objects.',
  },
  {
    name: OperatorName.Dematerialize,
    description: 'Unwraps Notification objects back into real emissions.',
  },
  {
    name: OperatorName.ToArray,
    description: 'Buffers all values and emits them as one array on complete.',
  },
];

export const CONDITIONAL_AND_BOOLEAN = [
  {
    name: OperatorName.IsEmpty,
    description: 'Emits true if the source completes without emitting.',
  },
  {
    name: OperatorName.DefaultIfEmpty,
    description: 'Emits a default value if the source emits nothing.',
  },
  { name: OperatorName.Every, description: 'Emits true if every value satisfies the condition.' },
  { name: OperatorName.Find, description: 'Emits the first value that satisfies the condition.' },
  {
    name: OperatorName.FindIndex,
    description: 'Emits the index of the first value satisfying the condition.',
  },
  {
    name: OperatorName.SequenceEqual,
    description: 'Emits true if the source matches another stream exactly.',
  },
];

export const MATHEMATICAL_AND_AGGREGATE = [
  { name: OperatorName.Count, description: 'Emits how many values the source emitted.' },
  { name: OperatorName.Min, description: 'Emits the smallest value the source emitted.' },
  { name: OperatorName.Max, description: 'Emits the largest value the source emitted.' },
  {
    name: OperatorName.Reduce,
    description: 'Accumulates over the stream, emitting one final result.',
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
