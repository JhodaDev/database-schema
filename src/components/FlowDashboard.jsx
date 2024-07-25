import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { getNodes, getRelations } from "../helpers/parseText";
import useAIStore from "../store/aiStore";
import { DownloadButton } from "./DownloadButton";
import { AddTableButton } from "./AddTableButton";
import Table from "./Table";

import "@xyflow/react/dist/style.css";

const rfStyle = {
  backgroundColor: "#1C1C1C",
};
const defaultViewport = { x: 10, y: 0, zoom: 2 };
const nodeTypes = { table: Table };

export const FlowDashboard = () => {
  const { tables } = useAIStore((state) => state);

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

        <div className="w-full flex justify-center py-2 relative z-50">
          <div className="bg-[#252525] py-2 px-4 rounded-lg shadow-lg shadow-[#ffffff1e] flex items-center gap-6">
            <DownloadButton />
            <AddTableButton />
          </div>
        </div>
      </ReactFlow>
    </div>
  );
};
