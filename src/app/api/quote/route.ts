export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random", {
      next: { revalidate: 0 }, // always fresh on server
    });
    if (!res.ok) return Response.json({ q: "The only way to do great work is to love what you do.", a: "Steve Jobs" });
    const json = await res.json();
    const quote = json?.[0];
    return Response.json({
      q: quote?.q || "",
      a: quote?.a || "",
    });
  } catch {
    return Response.json({ q: "The only way to do great work is to love what you do.", a: "Steve Jobs" });
  }
}
