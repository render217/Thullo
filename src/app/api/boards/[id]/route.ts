import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Construct the path to the boards.json file
    const filePath = path.join(process.cwd(), "src/app/api/boards/boards.json");

    // Read the contents of the file
    const data = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON data
    const boards = JSON.parse(data);

    // Find the board by id
    const board = boards.find(
      (b: any) => b.id.toString() === params.id.toString(),
    );

    // If the board is not found, return a 404 response
    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    // Return the found board as the response
    return NextResponse.json(board);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to read boards data" },
      { status: 500 },
    );
  }
}
