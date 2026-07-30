import { MemoryStick } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import sensors from "../../data/sensors-data";
import SensorCard from "../sensors/sensor-card";
import { Button } from "../ui/button";
import useBundleStore from "../../store/bundle-store";

interface SensorsStepProps {
  value: string[];
  onValueChange: (val: string[]) => void;
  onNext: () => void;
}

function SensorsStep({ value, onValueChange, onNext }: SensorsStepProps) {
  const count = useBundleStore((s) => s.sensors.length);

  return (
    <Accordion step={2} total={4} value={value} onValueChange={onValueChange}>
      <AccordionItem value="sensors">
        <AccordionTrigger
          className="py-3 text-md sm:text-xl font-medium"
          count={count}
        >
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
              onClick={onNext}
            >
              Next: Choose your accessories
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SensorsStep;
