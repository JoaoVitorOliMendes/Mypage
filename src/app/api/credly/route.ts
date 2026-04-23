

const CREDLY_USER_ID = "698e5384-587a-440a-873a-77e88178be99";

export async function GET() {
  try {
    const res = await fetch(
      `https://www.credly.com/users/${CREDLY_USER_ID}/badges.json`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return Response.json({ data: [] }, { status: res.status });
    }

    const json = await res.json();
    return Response.json(json, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  } catch {
    return Response.json({ data: [] }, { status: 502 });
  }
}
