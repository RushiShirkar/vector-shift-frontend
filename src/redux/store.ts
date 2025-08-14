import { create } from 'zustand';
import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType, type Node, type Edge, type NodeChange, type EdgeChange, type Connection } from 'reactflow';

export type State = {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  getNodeID: (type: string) => string;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => void;
  resetGraph: () => void;
};

export const useStore = create<State>((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    // Compute the smallest available positive integer suffix for this type
    const usedNumbers = new Set<number>();
    for (const node of get().nodes) {
      if ((node as any).type === type) {
        const match = /-(\d+)$/.exec(node.id);
        if (match) usedNumbers.add(Number(match[1]));
      }
    }
    let next = 1;
    while (usedNumbers.has(next)) next += 1;

    // Keep nodeIDs map in sync for visibility/debugging, though generation is scan-based
    const newIDs = { ...get().nodeIDs, [type]: next } as Record<string, number>;
    set({ nodeIDs: newIDs });
    return `${type}-${next}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 } as any },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue } as Node['data'];
        }
        return node;
      }),
    });
  },
  resetGraph: () => {
    set({ nodes: [], edges: [], nodeIDs: {} });
  },
}));

