import { MopidyTransportError } from './types';

export interface MopidyHttpOptions {
  url: string;
  fetch?: typeof globalThis.fetch;
  headers?: Record<string, string>;
}

export class MopidyHttpTransport {
  private readonly url: string;
  private readonly fetchImpl: typeof globalThis.fetch;
  private readonly headers: Record<string, string>;

  constructor(options: MopidyHttpOptions) {
    if (!options.url) {
      throw new Error('MopidyHttpTransport requires a url.');
    }

    if (!options.fetch && typeof globalThis.fetch !== 'function') {
      throw new Error('No fetch implementation available.');
    }

    this.url = options.url;
    this.fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  }

  async send<TResponse>(body: unknown): Promise<TResponse> {
    let response: Response;

    try {
      response = await this.fetchImpl(this.url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
      });
    } catch (cause) {
      throw new MopidyTransportError('Failed to reach Mopidy HTTP endpoint.', { cause });
    }

    if (!response.ok) {
      throw new MopidyTransportError(
        `Mopidy HTTP request failed with status ${response.status}.`
      );
    }

    try {
      return (await response.json()) as TResponse;
    } catch (cause) {
      throw new MopidyTransportError('Mopidy HTTP response was not valid JSON.', { cause });
    }
  }
}