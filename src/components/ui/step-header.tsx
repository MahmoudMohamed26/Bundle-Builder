export default function StepHeader({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <p className="uppercase text-text-primary text-xs px-4 pb-1 border-b border-black">
      step {step} of {total}
    </p>
  );
}
