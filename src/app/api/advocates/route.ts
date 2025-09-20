import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql, or, ilike, count, eq } from "drizzle-orm";

// @TODO: This is not the best way to do this. Recommend using full text search instead.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const offset = (page - 1) * limit;

  try {
    const filters = search
      ? or(
          ilike(advocates.firstName, `%${search}%`),
          ilike(advocates.lastName, `%${search}%`),
          ilike(advocates.city, `%${search}%`),
          ilike(advocates.degree, `%${search}%`),
          sql`${advocates.specialties}::text ILIKE ${`%${search}%`}`
        )
      : undefined;

    const [totalCount, data] = await Promise.all([
      db.select({ count: count() }).from(advocates).where(filters),
      db.select().from(advocates).where(filters).limit(limit).offset(offset),
    ]);

    const total = Number(totalCount[0]?.count ?? 0);
    const pages = Math.max(1, Math.ceil(total / limit));

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages,
        next: page < pages,
        prev: page > 1,
      },
    });
  } catch (err) {
    console.error("[GET /advocates] DB error:", err);
    return Response.json(
      { error: "Something went wrong fetching advocates." },
      { status: 500 }
    );
  }
}
