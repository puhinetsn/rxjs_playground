import {
  AccumulatorOperatorOptions,
  ComparisonOperatorOptions,
  ComparisonOperators,
  HigherOrderMapOptions,
  NotifierOperatorOptions,
  NumericOperators,
  OperatorOptions,
  ValueOperatorOptions,
} from '../engine/models/operator.model';
import { OperatorName } from './operators';

const value = (value: number): ValueOperatorOptions => ({ value });
const comparison = (operator: ComparisonOperators, value: number): ComparisonOperatorOptions => ({
  operator,
  value,
});
const accumulator = (operator: NumericOperators, seed: number): AccumulatorOperatorOptions => ({
  operator,
  seed,
});
const higherOrder = (innerCount: number, intervalMs: number): HigherOrderMapOptions => ({
  innerCount,
  intervalMs,
});
const notifier = (notifierId: string): NotifierOperatorOptions => ({ notifierId });

export const OPERATOR_DEFAULTS: Record<OperatorName, OperatorOptions> = {
  [OperatorName.Delay]: value(1000),
  [OperatorName.Take]: value(3),
  [OperatorName.TakeLast]: value(3),
  [OperatorName.Skip]: value(1),
  [OperatorName.SkipLast]: value(1),
  [OperatorName.ElementAt]: value(0),
  [OperatorName.BufferCount]: value(3),
  [OperatorName.WindowCount]: value(3),
  [OperatorName.Retry]: value(3),
  [OperatorName.BufferTime]: value(1000),
  [OperatorName.WindowTime]: value(1000),
  [OperatorName.DebounceTime]: value(300),
  [OperatorName.ThrottleTime]: value(300),
  [OperatorName.AuditTime]: value(300),
  [OperatorName.SampleTime]: value(500),
  [OperatorName.MapTo]: value(1),
  [OperatorName.StartWith]: value(0),
  [OperatorName.DefaultIfEmpty]: value(0),

  [OperatorName.Filter]: comparison(ComparisonOperators.GREATER_THAN, 0),
  [OperatorName.TakeWhile]: comparison(ComparisonOperators.LESS_THAN, 5),
  [OperatorName.SkipWhile]: comparison(ComparisonOperators.LESS_THAN, 3),
  [OperatorName.Every]: comparison(ComparisonOperators.GREATER_THAN, 0),
  [OperatorName.Find]: comparison(ComparisonOperators.GREATER_THAN, 3),
  [OperatorName.FindIndex]: comparison(ComparisonOperators.GREATER_THAN, 3),

  [OperatorName.Map]: accumulator(NumericOperators.MULTIPLY, 2),
  [OperatorName.Scan]: accumulator(NumericOperators.PLUS, 0),
  [OperatorName.SwitchScan]: accumulator(NumericOperators.PLUS, 0),
  [OperatorName.MergeScan]: accumulator(NumericOperators.PLUS, 0),
  [OperatorName.Reduce]: accumulator(NumericOperators.PLUS, 0),

  [OperatorName.MergeMap]: higherOrder(3, 500),
  [OperatorName.SwitchMap]: higherOrder(3, 500),
  [OperatorName.ConcatMap]: higherOrder(3, 500),
  [OperatorName.ExhaustMap]: higherOrder(3, 500),

  [OperatorName.Buffer]: {},
  [OperatorName.Window]: {},
  [OperatorName.TakeUntil]: {},
  [OperatorName.SkipUntil]: {},
  [OperatorName.WithLatestFrom]: {},
  [OperatorName.SequenceEqual]: {},

  [OperatorName.Pairwise]: {},
  [OperatorName.First]: {},
  [OperatorName.Last]: {},
  [OperatorName.Distinct]: {},
  [OperatorName.DistinctUntilChanged]: {},
  [OperatorName.IgnoreElements]: {},
  [OperatorName.MergeAll]: {},
  [OperatorName.ConcatAll]: {},
  [OperatorName.SwitchAll]: {},
  [OperatorName.ExhaustAll]: {},
  [OperatorName.CombineLatestAll]: {},
  [OperatorName.Share]: {},
  [OperatorName.Timestamp]: {},
  [OperatorName.TimeInterval]: {},
  [OperatorName.Materialize]: {},
  [OperatorName.Dematerialize]: {},
  [OperatorName.ToArray]: {},
  [OperatorName.IsEmpty]: {},
  [OperatorName.Count]: {},
  [OperatorName.Min]: {},
  [OperatorName.Max]: {},
};

export const OPERATORS_WITH_VALUE_OPTIONS: OperatorName[] = [
  OperatorName.Delay,
  OperatorName.Take,
  OperatorName.TakeLast,
  OperatorName.Skip,
  OperatorName.SkipLast,
  OperatorName.ElementAt,
  OperatorName.BufferCount,
  OperatorName.WindowCount,
  OperatorName.Retry,
  OperatorName.BufferTime,
  OperatorName.WindowTime,
  OperatorName.DebounceTime,
  OperatorName.ThrottleTime,
  OperatorName.AuditTime,
  OperatorName.SampleTime,
  OperatorName.MapTo,
  OperatorName.StartWith,
  OperatorName.DefaultIfEmpty,
];

export const OPERATORS_WITH_COMPARISON_OPTIONS: OperatorName[] = [
  OperatorName.Filter,
  OperatorName.TakeWhile,
  OperatorName.SkipWhile,
  OperatorName.Every,
  OperatorName.Find,
  OperatorName.FindIndex,
];

export const OPERATORS_WITH_ACCUMULATOR_OPTIONS: OperatorName[] = [
  OperatorName.Map,
  OperatorName.Scan,
  OperatorName.SwitchScan,
  OperatorName.MergeScan,
  OperatorName.Reduce,
];

export const OPERATORS_WITH_HIGHER_ORDER_OPTIONS: OperatorName[] = [
  OperatorName.MergeMap,
  OperatorName.SwitchMap,
  OperatorName.ConcatMap,
  OperatorName.ExhaustMap,
];

export const OPERATORS_WITH_NOTIFIER_OPTIONS: OperatorName[] = [
  OperatorName.Buffer,
  OperatorName.Window,
  OperatorName.TakeUntil,
  OperatorName.SkipUntil,
  OperatorName.WithLatestFrom,
  OperatorName.SequenceEqual,
];

export const OPERATORS_WITH_NO_OPTIONS: OperatorName[] = [
  OperatorName.Pairwise,
  OperatorName.First,
  OperatorName.Last,
  OperatorName.Distinct,
  OperatorName.DistinctUntilChanged,
  OperatorName.IgnoreElements,
  OperatorName.MergeAll,
  OperatorName.ConcatAll,
  OperatorName.SwitchAll,
  OperatorName.ExhaustAll,
  OperatorName.CombineLatestAll,
  OperatorName.Share,
  OperatorName.Timestamp,
  OperatorName.TimeInterval,
  OperatorName.Materialize,
  OperatorName.Dematerialize,
  OperatorName.ToArray,
  OperatorName.IsEmpty,
  OperatorName.Count,
  OperatorName.Min,
  OperatorName.Max,
];
