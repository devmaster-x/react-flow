export interface NodeType {
  id: string,
  position: {x: number, y: number},
  data: { label: string },
  type: string
}

export interface EdgeType {
  id: string,
  source: string,
  target: string
}