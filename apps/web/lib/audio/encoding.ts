export const encodeUri = (uri: string): string =>
  Buffer.from(uri).toString('base64url');

export const decodeUri = (encoded: string): string =>
  Buffer.from(encoded, 'base64url').toString();
