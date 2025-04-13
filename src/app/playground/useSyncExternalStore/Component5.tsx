import { useNetworkStatus } from "./networkStatusStore";

export function Component5() {
  const isOnline = useNetworkStatus()
  
  return (
    <div>
      <h2>isOnline: {`${isOnline}`}</h2>
    </div>
  );
}
