export interface Operator {
  name:        string;
  description: string;
  options:     OperatorOptions;
}

export interface OperatorOptions {
}

export enum NumericOperators {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/'
}

export interface NumericOperatorOptions extends OperatorOptions {
  operator: NumericOperators;
  value: number;
}

