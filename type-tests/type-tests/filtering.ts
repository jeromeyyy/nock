// Compile-time regression coverage for the public typings of
// Scope.filteringPath and Scope.filteringRequestBody (issue #3054).
// Checked by `npm run lint:ts` (tsc --noEmit); not shipped in dist.

import nock from '../index.ts'

// Regular expression + replacement string
nock('http://example.test').filteringPath(/id=\d+/g, 'id=123')
nock('http://example.test').filteringRequestBody(/"id":\d+/, '"id":1')

// Transform function
nock('http://example.test').filteringPath((path: string) => path.toLowerCase())
nock('http://example.test').filteringRequestBody(
  (body: string, recordedBody: string) => body + recordedBody,
)

// @ts-expect-error - a filter argument is required
nock('http://example.test').filteringPath()

// @ts-expect-error - a filter argument is required
nock('http://example.test').filteringRequestBody()
