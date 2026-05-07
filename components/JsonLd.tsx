/**
 * Server-only JSON-LD renderer.
 *
 * Pass any plain object — usually the output of jsonLdGraph() from
 * lib/schema.ts — and it gets serialized into a <script> tag with the
 * correct type and minimal whitespace.
 *
 * No JS ships to the client; this is purely server-rendered markup.
 */

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema must be JSON, never executed. We strip </script tokens
      // defensively in case any string field contains them.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
