import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Construct the path to the boards.json file
    const filePath = path.join(process.cwd(), "src/app/api/users/users.json");

    // Read the contents of the file
    const data = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON data
    const boards = JSON.parse(data);

    // Return the JSON data as the response
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read boards data" },
      { status: 500 },
    );
  }
}
