// Strip C0/C1 control chars (except \n, \r, \t), zero-width chars, and bidi overrides.
// Comments are rendered with Vue text interpolation, which HTML-escapes already;
// this normalization prevents invisible glyphs and bidi-override tricks from being stored.
const CONTROL_CHARS = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F]', 'g')
const ZERO_WIDTH_AND_BIDI = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2066-\\u2069\\uFEFF]', 'g')

export function sanitizeComment(input: string): string {
  return input
    .replace(CONTROL_CHARS, '')
    .replace(ZERO_WIDTH_AND_BIDI, '')
    .replace(/\r\n/g, '\n')
    .trim()
}

export function sanitizeName(input: string): string {
  return input.replace(CONTROL_CHARS, '').replace(ZERO_WIDTH_AND_BIDI, '').trim()
}
