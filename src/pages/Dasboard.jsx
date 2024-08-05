import { Editor } from "../components/cm/Editor";
import { FlowDashboard } from "../components/FlowDashboard";
import { LeftBar } from "../components/LeftBar";
import useAIStore from "../store/aiStore";

function Dashboard() {
  const { markdown } = useAIStore((state) => state);

  return (
    <div className="grid grid-cols-table h-screen w-full">
      <LeftBar />
      <Editor code={markdown} />
      <FlowDashboard />
    </div>
  );
}

export default Dashboard;
