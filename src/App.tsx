import { Camera } from "lucide-react";
import "./App.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

function App() {
  return (
    <div className="container py-10! grid grid-cols-3 gap-10">
      <div className="bg-secondary py-3 col-span-2 rounded-[10px]">
        <h1 className="text-text-primary text-xs px-4 pb-1 border-b border-black">
          STEP 1 OF 4
        </h1>
        <div className="px-4 pt-3">
          <Accordion defaultValue={["cameras"]}>
            <AccordionItem value="cameras">
              <AccordionTrigger className="py-1.5 text-xl font-medium">
                <div className="flex gap-2 items-center">
                  <Camera className="text-text-primary" />
                  Choose your cameras
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm">
                  Select the cameras you want to include in your bundle.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default App;
