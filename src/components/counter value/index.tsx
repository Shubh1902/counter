export const CounterValue = ({ value }: { value: string | number }) => {
  return (
    <div className="counter-value">
      <div className="text-bold font-size-13">Counter Value</div>
      <div className="font-size-13 text-bold">{value}</div>
    </div>
  );
};
