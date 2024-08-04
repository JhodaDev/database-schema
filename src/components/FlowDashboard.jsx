import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRelations } from "../helpers/parseText";
import { DownloadButton } from "./DownloadButton";
import { AddTableButton } from "./AddTableButton";
import Table from "./Table";

import "@xyflow/react/dist/style.css";
import tableStore from "../store/tableStore";

const rfStyle = {
  backgroundColor: "#1C1C1C",
};
const defaultViewport = { x: 10, y: 0, zoom: 2 };
const nodeTypes = { table: Table };

export const FlowDashboard = () => {
  const { nodes: nodesStore, setNodes: setNodesStore } = tableStore();
  const [nodes, setNodes] = useState(nodesStore);
  const flowRef = useRef(null);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const generatedEdges = getRelations(nodes);
    setEdges(generatedEdges);
  }, [nodes]);

  useEffect(() => {
    setNodes(nodesStore);
  }, [nodesStore]);

  // const onNodesChange = useCallback(
  //   (changes) => {
  //     const updatedNodes = applyNodeChanges(changes, nodes);
  //     setNodes(updatedNodes);
  //     setNodesStore(updatedNodes);
  //   },
  //   [nodes, setNodesStore]
  // );

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
      ref={flowRef}
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
        minZoom={0.5}
      >
        <Background bgColor="#fff" variant={BackgroundVariant.Lines} gap={30} />

        <div className="w-full flex justify-center py-2 relative z-50 header-left">
          <div className="bg-[#252525] py-2 px-4 rounded-lg shadow-lg shadow-[#ffffff1e] flex items-center gap-6">
            <DownloadButton flowRefs={flowRef} nodes={nodes} />
            <AddTableButton />
          </div>
        </div>
      </ReactFlow>
    </div>
  );
};
