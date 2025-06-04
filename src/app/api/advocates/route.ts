import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  // const data = advocateData;

  return new Response(JSON.stringify({ data }), {
    headers: {
      "Content-Type": "application/json",
    }
  });
}
