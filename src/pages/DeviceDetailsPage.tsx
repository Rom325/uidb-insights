import { useParams } from "react-router-dom";

function DeviceDetailsPage() {
  const { deviceId } = useParams<{ deviceId: string }>();

  return (
    <section aria-labelledby="device-details-title">
      <h1 id="device-details-title">Device Details</h1>
      <p>Details for device ID: {deviceId ?? "unknown"}</p>
    </section>
  );
}

export default DeviceDetailsPage;
