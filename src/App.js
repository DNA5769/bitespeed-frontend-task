import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, 
  useReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
import Sidebar from './Sidebar';
import Header from './Header';
import { useDnD } from './DnDContext';
 
const initialNodes = [
  // { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  // { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [
  // { id: 'n1-n2', source: 'n1', target: 'n2' }
];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [nodeId, setNodeId] = useDnD();
 
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `n${nodeId}`,
        position,
        data: { label: `...` },
      };
      setNodeId(nodeId+1);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, nodeId],
  );
 
  const onDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <div className='app'>
      <Header />
      <div className='main'>
        <div style={{ width: '70vw', height: '95vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            fitView
          />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}