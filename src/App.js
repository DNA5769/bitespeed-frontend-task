import { useState, useEffect, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, 
  useReactFlow,
  useNodesState,
  useEdgesState,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css'
import Sidebar from './Sidebar';
import Header from './Header';
import { useDnD } from './DnDContext';
 
export default function App() {
  const [nid, setNID] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, setViewport } = useReactFlow();
  const { nodeId, setNodeId, sbMode, setSBMode, text, setText, setCheck, setRfInstance } = useDnD();

  useEffect(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem('flow-save'));
 
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodeId(flow.nodes+1);
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
 
    restoreFlow();
  }, []);

  useEffect(() => {
    let l = new Set();
    setNodes(nds => {
      nds.map(node => l.add(node.id));
      setEdges(eds => {
        eds.map(edge => l.delete(edge.source));
        console.log(l)
        setCheck(l.size <= 1);
        return eds;
      });
      return nds;
    });
  }, [nodes, edges]);
  

  useEffect(() => {
    setNodes(nds => nds.map(node => {
      if (nid !== null && node.id === nid)
        return {
          ...node,
          data: {
            ...node.data,
            label: text,
          },
        };
      return node;
    }));
  }, [text])
  

  const onNodeClick = useCallback(
    (event) => {
      event.preventDefault();
      if (sbMode === null)
      {
        setNID(event.target.dataset.id)
        setSBMode(event.target.dataset.id);
        setNodes(nds => nds.map(node => {
          if (node.id === event.target.dataset.id)
            setText(node.data.label);
          return node;
        }));
      }
      else
        setSBMode(null);
    },
    [],
  );
 
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
        data: { label: `Click to write message` },
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
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
        <div style={{ width: '80vw', height: '95vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onInit={setRfInstance}
            fitView
          />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}