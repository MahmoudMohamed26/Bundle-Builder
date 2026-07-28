import { createContext, useContext } from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "../../lib/utils";
import StepHeader from "./step-header";

const StepContext = createContext({ step: 0, total: 0 });

function Accordion({
  className,
  step,
  total,
  ...props
}: AccordionPrimitive.Root.Props & { step?: number; total?: number }) {
  return (
    <StepContext.Provider value={{ step: step ?? 0, total: total ?? 0 }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn("flex w-full flex-col", className)}
        {...props}
      />
    </StepContext.Provider>
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const { step, total } = useContext(StepContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger aria-expanded:bg-secondary! flex-1 relative rounded-t-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all delay-200 outline-none focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-expanded:delay-0",
          className,
        )}
        {...props}
      >
        <div className="bg-black h-px w-full absolute bottom-0 opacity-100 visible transition-all duration-0 delay-200 group-aria-expanded/accordion-trigger:opacity-0 group-aria-expanded/accordion-trigger:invisible group-aria-expanded/accordion-trigger:delay-0"></div>
        <StepHeader step={step} total={total} />
        <div className="flex flex-1 px-4 pt-3 items-center justify-between">
          {children}
          <span className="text-primary text-md transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180">
            ⏷
          </span>
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden px-4 rounded-b-lg bg-secondary text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pb-3 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
