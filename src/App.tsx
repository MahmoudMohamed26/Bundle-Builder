import { Camera } from "lucide-react";
import "./App.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import cameras from "./data/cameras-data";
import CameraCard from "./components/cameras/camera-card";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="container py-10! grid grid-cols-3 gap-10">
      <div className="col-span-2 rounded-[10px]">
        <div>
          <Accordion defaultValue={["cameras"]} step={1} total={4}>
            <AccordionItem value="cameras">
              <AccordionTrigger className="py-3 text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Camera className="text-text-primary" />
                  Choose your cameras
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {cameras.map((cam, i) => {
                    const lastOdd =
                      cameras.length % 2 !== 0 && i === cameras.length - 1;
                    return (
                      <div
                        key={cam.id}
                        className={
                          lastOdd
                            ? "col-span-2 max-w-[379px] m-auto flex justify-center"
                            : ""
                        }
                      >
                        <CameraCard cam={cam} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 justify-center flex">
                  <Button variant={"outline"} className="text-lg font-bold">
                    Next: Choose your plan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default App;
