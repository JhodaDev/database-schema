import { FlowDashboard } from "../components/FlowDashboard";
import { LeftBar } from "../components/LeftBar";
import navigateStore from "../store/navigateStore";

function Dashboard() {
  const { Component } = navigateStore();

  return (
    <div className="grid grid-cols-table h-screen w-full">
      <LeftBar />
      {<Component />}
      <FlowDashboard />
    </div>
  );
}

export default Dashboard;
