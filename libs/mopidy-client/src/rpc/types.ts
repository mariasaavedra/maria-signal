export type JsonRpcId = string | number;

export interface JsonRpcRequest<TMethod extends string = string, TParams = unknown> {
  jsonrpc: '2.0';
  id: JsonRpcId;
  method: TMethod;
  params?: TParams;
}

export interface JsonRpcSuccess<TResult = unknown> {
  jsonrpc: '2.0';
  id: JsonRpcId;
  result: TResult;
}

export interface JsonRpcErrorObject {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcFailure {
  jsonrpc: '2.0';
  id: JsonRpcId | null;
  error: JsonRpcErrorObject;
}

export type JsonRpcResponse<TResult = unknown> =
  | JsonRpcSuccess<TResult>
  | JsonRpcFailure;

export const isJsonRpcFailure = <TResult>(
  response: JsonRpcResponse<TResult>
): response is JsonRpcFailure => {
  return 'error' in response;
};

export class MopidyTransportError extends Error {
  readonly cause?: unknown;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'MopidyTransportError';
    this.cause = options?.cause;
  }
}

export class MopidyRpcError extends Error {
  readonly code: number;
  readonly data?: unknown;
  readonly method: string;
  readonly params?: unknown;

  constructor(options: {
    code: number;
    message: string;
    method: string;
    params?: unknown;
    data?: unknown;
  }) {
    super(options.message);
    this.name = 'MopidyRpcError';
    this.code = options.code;
    this.method = options.method;
    this.params = options.params;
    this.data = options.data;
  }
}

export class MopidyValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MopidyValidationError';
  }
}