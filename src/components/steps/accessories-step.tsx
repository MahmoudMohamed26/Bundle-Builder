import { Cable } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import accessories from "../../data/accessories-data";
import AccessoryCard from "../accessories/accessory-card";
import { Button } from "../ui/button";
import useBundleStore from "../../store/bundle-store";

interface AccessoriesStepProps {
  value: string[];
  onValueChange: (val: string[]) => void;
  onNext: () => void;
}

function AccessoriesStep({ value, onValueChange, onNext }: AccessoriesStepProps) {
  const count = useBundleStore((s) => s.accessories.length);

  return (
    <Accordion step={3} total={4} value={value} onValueChange={onValueChange}>
      <AccordionItem value="accessories">
        <AccordionTrigger
          className="py-3 text-md sm:text-xl font-medium"
          count={count}
        >
          <div className="flex gap-2 items-center">
            <Cable className="text-text-primary" />
            Choose your accessories
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {accessories.map((accessory, i) => {
              const lastOdd =
                accessories.length % 2 !== 0 && i === accessories.length - 1;
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
              onClick={onNext}
            >
              Next: Choose your plan
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccessoriesStep;
