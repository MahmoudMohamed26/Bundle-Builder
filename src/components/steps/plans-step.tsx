import { Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import plans from "../../data/plans-data";
import PlanCard from "../plans/plan-card";
import useBundleStore from "../../store/bundle-store";

interface PlansStepProps {
  value: string[];
  onValueChange: (val: string[]) => void;
}

function PlansStep({ value, onValueChange }: PlansStepProps) {
  const hasPlan = useBundleStore((s) => s.plan !== null);
  const count = hasPlan ? 1 : 0;

  return (
    <Accordion step={4} total={4} value={value} onValueChange={onValueChange}>
      <AccordionItem value="plans">
        <AccordionTrigger
          className="py-3 text-md sm:text-xl font-medium"
          count={count}
        >
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
  );
}

export default PlansStep;
