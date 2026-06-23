export interface Operator {
  name: string;
  options: OperatorOptions;
}

export interface OperatorOptions {}

export enum NumericOperators {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

export enum ComparisonOperators {
  GREATER_THAN = '>',
  LESS_THAN = '<',
  GREATER_OR_EQUAL = '>=',
  LESS_OR_EQUAL = '<=',
  EQUAL = '===',
  NOT_EQUAL = '!==',
}

export enum OperatorTypes {
  Transformation = 'Transformation',
  Filtering = 'Filtering',
  Join = 'Join',
  ErrorHandling = 'Error Handling',
  Multicasting = 'Multicasting',
  Utility = 'Utility',
  ConditionalAndBoolean = 'Conditional And Boolean',
  MathematicalAndAggregate = 'Mathematical And Aggregate',
}

export interface ComparisonOperatorOptions extends OperatorOptions {
  operator: ComparisonOperators;
  value: number;
}

export interface ValueOperatorOptions extends OperatorOptions {
  value: number;
}

export interface AccumulatorOperatorOptions extends OperatorOptions {
  operator: NumericOperators;
  seed: number;
}
export interface HigherOrderMapOptions extends OperatorOptions {
  innerCount: number;
  intervalMs: number;
}

export interface NotifierOperatorOptions extends OperatorOptions {
  notifierId: string;
}
