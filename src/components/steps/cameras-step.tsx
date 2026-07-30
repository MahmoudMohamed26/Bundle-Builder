import { Camera } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import cameras from "../../data/cameras-data";
import CameraCard from "../cameras/camera-card";
import { Button } from "../ui/button";
import useBundleStore from "../../store/bundle-store";

interface CamerasStepProps {
  value: string[];
  onValueChange: (val: string[]) => void;
  onNext: () => void;
}

function CamerasStep({ value, onValueChange, onNext }: CamerasStepProps) {
  const count = useBundleStore((s) => s.cameras.length);

  return (
    <Accordion step={1} total={4} value={value} onValueChange={onValueChange}>
      <AccordionItem value="cameras">
        <AccordionTrigger
          className="py-3 text-md sm:text-xl font-medium"
          count={count}
        >
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
              onClick={onNext}
            >
              Next: Choose your Sensors
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CamerasStep;
