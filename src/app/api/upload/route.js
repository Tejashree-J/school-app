import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + path.extname(file.name);
    const filePath = `./public/schoolImages/${fileName}`;

    await fs.writeFile(filePath, buffer);

    return NextResponse.json(
      { filePath: `/schoolImages/${fileName}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
