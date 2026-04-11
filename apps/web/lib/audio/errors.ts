import {
  MopidyRpcError,
  MopidyTransportError,
  MopidyValidationError,
} from '@m7/mopidy';

export function toAudioError(err: unknown): { body: { ok: false; error: string }; status: number } {
  if (err instanceof MopidyValidationError) {
    return { body: { ok: false, error: err.message }, status: 400 };
  }
  if (err instanceof MopidyTransportError) {
    return { body: { ok: false, error: err.message }, status: 502 };
  }
  if (err instanceof MopidyRpcError) {
    return { body: { ok: false, error: err.message }, status: 502 };
  }
  if (err instanceof Error) {
    return { body: { ok: false, error: err.message }, status: 400 };
  }
  return { body: { ok: false, error: 'Internal server error' }, status: 500 };
}
