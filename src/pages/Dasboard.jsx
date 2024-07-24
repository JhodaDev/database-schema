import { useCallback, useState, useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Table from "../components/Table";
import useAIStore from "../store/aiStore";
import { getNodes, getRelations } from "../helpers/parseText";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

const rfStyle = {
  backgroundColor: "#1C1C1C",
};
const defaultViewport = { x: 10, y: 0, zoom: 2 };
const nodeTypes = { table: Table };

function Dashboard() {
  const { tables, markdown } = useAIStore((state) => state);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const generatedNodes = getNodes(tables);
    setNodes(generatedNodes);
    const generatedEdges = getRelations(generatedNodes);
    setEdges(generatedEdges);
  }, [tables]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div className="grid grid-cols-table h-screen w-full">
      <div className="overflow-auto content-code">
        <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
          {markdown}
        </Markdown>
      </div>
      <div
        className="h-full"
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={rfStyle}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          defaultViewport={defaultViewport}
        >
          <Background variant={BackgroundVariant.Dots} gap={40} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Dashboard;
