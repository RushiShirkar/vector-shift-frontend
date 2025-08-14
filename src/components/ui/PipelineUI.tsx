import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, BackgroundVariant } from 'reactflow';
import { shallow } from 'zustand/shallow';
import type { State } from 'redux/store';
import { useStore } from 'redux/store';
import { InputNode, LLMNode, OutputNode, TextNode, PromptNode, DelayNode, MathNode, IfNode } from '../nodes';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true } as const;
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  delay: DelayNode,
  math: MathNode,
  if: IfNode,
};

export const PipelineUI: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(
    (state: State) => ({
      nodes: state.nodes,
      edges: state.edges,
      getNodeID: state.getNodeID,
      addNode: state.addNode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
    }),
    shallow
  );

  const getInitNodeData = (nodeID: string, type: keyof typeof nodeTypes) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;
    const payload = event?.dataTransfer?.getData('application/reactflow');
    if (payload) {
      const appData = JSON.parse(payload);
      const type = appData?.nodeType as keyof typeof nodeTypes | undefined;
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      } as any;
      addNode(newNode);
    }
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full overflow-hidden border border-gray-200 bg-white">
      <ReactFlow
        nodes={nodes as any}
        edges={edges as any}
        onNodesChange={onNodesChange as any}
        onEdgesChange={onEdgesChange as any}
        onConnect={onConnect as any}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes as any}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize] as [number, number]}
        connectionLineType={"smoothstep" as any}
      >
        <Background variant={BackgroundVariant.Dots} color="#cbd5e1" gap={gridSize} />
        <Controls position="top-right" />
        <MiniMap nodeColor="#e0e7ff" zoomable pannable />
      </ReactFlow>
    </div>
  );
};