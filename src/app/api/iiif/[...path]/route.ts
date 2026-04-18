import { NextRequest, NextResponse } from "next/server";

const IIIF_BASE = "https://www.artic.edu/iiif/2";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const iiifPath = path.join("/");

  try {
    const res = await fetch(`${IIIF_BASE}/${iiifPath}`, {
      headers: {
        "AIC-User-Agent": "MyPage (joaovitordeoliveiramendes@tutanota.com)",
      },
    });

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const contentLength = res.headers.get("content-length");

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    };
    if (contentLength) headers["Content-Length"] = contentLength;

    // Stream the response body instead of buffering
    return new NextResponse(res.body, { headers });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
