import { useState } from "react";
import { Cable, Camera, MemoryStick, Shield } from "lucide-react";
import "./App.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import cameras from "./data/cameras-data";
import sensors from "./data/sensors-data";
import accessories from "./data/accessories-data";
import plans from "./data/plans-data";
import CameraCard from "./components/cameras/camera-card";
import SensorCard from "./components/sensors/sensor-card";
import AccessoryCard from "./components/accessories/accessory-card";
import PlanCard from "./components/plans/plan-card";
import { Button } from "./components/ui/button";
import Seperator from "./components/global/seperator";

function App() {
  const [open, setOpen] = useState<Record<string, string[]>>({
    cameras: ["cameras"],
    sensors: [],
    accessories: [],
    plans: [],
  });

  const handleNext = (current: string, next: string) => {
    setOpen((prev) => ({ ...prev, [current]: [], [next]: [next] }));
  };

  return (
    <div className="container py-10! grid xl:grid-cols-3 items-start gap-10">
      <div className="lg:col-span-2">
        <div className="space-y-3">
          <Accordion
            step={1}
            total={4}
            value={open.cameras}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, cameras: val }))
            }
          >
            <AccordionItem value="cameras">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Camera className="text-text-primary" />
                  Choose your cameras
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cameras.map((cam, i) => {
                    const lastOdd =
                      cameras.length % 2 !== 0 && i === cameras.length - 1;
                    return (
                      <div
                        key={cam.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <CameraCard cam={cam} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("cameras", "sensors")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={2}
            total={4}
            value={open.sensors}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, sensors: val }))
            }
          >
            <AccordionItem value="sensors">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <MemoryStick className="text-text-primary" />
                  Choose your sensors & modules
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sensors.map((sensor, i) => {
                    const lastOdd =
                      sensors.length % 2 !== 0 && i === sensors.length - 1;
                    return (
                      <div
                        key={sensor.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <SensorCard sensor={sensor} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("sensors", "accessories")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={3}
            total={4}
            value={open.accessories}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, accessories: val }))
            }
          >
            <AccordionItem value="accessories">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Cable className="text-text-primary" />
                  Choose your accessories
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {accessories.map((accessory, i) => {
                    const lastOdd =
                      accessories.length % 2 !== 0 &&
                      i === accessories.length - 1;
                    return (
                      <div
                        key={accessory.id}
                        className={
                          lastOdd
                            ? "sm:col-span-2 xl:max-w-[500px] 2xl:max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <AccessoryCard accessory={accessory} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button
                    variant="outline"
                    className="text-lg font-bold"
                    onClick={() => handleNext("accessories", "plans")}
                  >
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            step={4}
            total={4}
            value={open.plans}
            onValueChange={(val) =>
              setOpen((prev) => ({ ...prev, plans: val }))
            }
          >
            <AccordionItem value="plans">
              <AccordionTrigger className="py-3 text-md sm:text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Shield className="text-text-primary" />
                  Choose your plan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-3 gap-3 py-3">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="bg-secondary py-3 px-4 rounded-lg">
        <span className="uppercase tracking-wider text-xs text-text-primary font-semibold">
          review
        </span>
        <h2 className="text-[22px] font-semibold mt-4">Your security system</h2>
        <p className="mt-2 text-sm text-text-primary max-w-xs">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
        <Seperator />
        <h6 className="uppercase text-sm text-text-primary">cameras</h6>
      </div>
    </div>
  );
}

export default App;
