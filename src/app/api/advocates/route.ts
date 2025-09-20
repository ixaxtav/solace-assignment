import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
 
  const data = await db.select().from(advocates);

  return Response.json({ data });
}
