import { initialNodes, initialEdges } from "@/Constants";
import { NextRequest, NextResponse } from "next/server";
import { NodeType, EdgeType } from "@/components/nodes/type";


// Using an interface for the response data structure
interface FlowData {
  nodes: NodeType[];
  edges: EdgeType[];
}

let savedNodes : NodeType[] = initialNodes;
let savedEdges : EdgeType[] = initialEdges;

function createResponseWithCors(data: FlowData | null, status: number) {
  const response = NextResponse.json(data, { status });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function GET() {
  return createResponseWithCors({ nodes: savedNodes, edges: savedEdges }, 200);
}

export async function PUT(request: NextRequest) {
  try {
    const { nodes, edges }: FlowData = await request.json();
    savedNodes = nodes;
    savedEdges = edges;
    return createResponseWithCors(
      { nodes: savedNodes, edges: savedEdges },
      200
    );
  } catch (error) {
    console.log(error);
    return createResponseWithCors(null, 500);
  }
}