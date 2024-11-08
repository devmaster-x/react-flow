import { initialNodes, initialEdges } from "@/Constants";
import { NextRequest, NextResponse } from "next/server";

let savedNodes = initialNodes;
let savedEdges = initialEdges;

export async function GET() {
  return NextResponse.json({ nodes: savedNodes, edges: savedEdges }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  try {
    const { nodes, edges } = await request.json();
    savedNodes = nodes;
    savedEdges = edges;
    return NextResponse.json({ success: true, message: "Data saved successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save data." + error }, { status: 500 });
  }
}
