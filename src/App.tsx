import { useState } from "react";
import "./App.css";
import CamerasStep from "./components/steps/cameras-step";
import SensorsStep from "./components/steps/sensors-step";
import AccessoriesStep from "./components/steps/accessories-step";
import PlansStep from "./components/steps/plans-step";
import ReviewSidebar from "./components/review/review-sidebar";

function App() {
  const [open, setOpen] = useState<Record<string, string[]>>({
    cameras: ["cameras"],
    sensors: [],
    accessories: [],
    plans: [],
  });

  return (
    <div className="container">
      <h1 className="text-3xl mt-10 font-bold">Let's Get Started</h1>
      <div className="py-5 grid xl:grid-cols-3 items-start gap-3 xl:gap-10">
        <div className="xl:col-span-2">
          <div className="space-y-3">
            <CamerasStep
              value={open.cameras}
              onValueChange={(val) =>
                setOpen((prev) => ({ ...prev, cameras: val as string[] }))
              }
              onNext={() =>
                setOpen((prev) => ({
                  ...prev,
                  cameras: [],
                  sensors: ["sensors"],
                }))
              }
            />
            <SensorsStep
              value={open.sensors}
              onValueChange={(val) =>
                setOpen((prev) => ({ ...prev, sensors: val as string[] }))
              }
              onNext={() =>
                setOpen((prev) => ({
                  ...prev,
                  sensors: [],
                  accessories: ["accessories"],
                }))
              }
            />
            <AccessoriesStep
              value={open.accessories}
              onValueChange={(val) =>
                setOpen((prev) => ({ ...prev, accessories: val as string[] }))
              }
              onNext={() =>
                setOpen((prev) => ({
                  ...prev,
                  accessories: [],
                  plans: ["plans"],
                }))
              }
            />
            <PlansStep
              value={open.plans}
              onValueChange={(val) =>
                setOpen((prev) => ({ ...prev, plans: val as string[] }))
              }
            />
          </div>
        </div>
        <ReviewSidebar />
      </div>
    </div>
  );
}

export default App;
