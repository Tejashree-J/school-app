import { db } from "@/lib/db";

// POST = Add new school
export async function POST(req) {
  try {
    const { name, address, city, state, contact, image, email_id } =
      await req.json();

    //  Check for duplicates
    const [existing] = await db.query(
      "SELECT * FROM schools WHERE name=? OR address=? OR image=? OR email_id=?",
      [name, address, image, email_id]
    );

    if (existing.length > 0) {
      return new Response(
        JSON.stringify({
          error:
            "School is already added, please change Name/Image/Address/Email.",
        }),
        { status: 409 } // 409 Conflict
      );
    }

    //  Insert new school
    const [result] = await db.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, image, email_id]
    );

    return new Response(JSON.stringify({ id: result.insertId }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

// GET = Fetch all schools
export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
