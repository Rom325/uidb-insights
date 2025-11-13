import { Link, useParams } from "react-router-dom";
import { Collapsible } from "@base-ui-components/react/collapsible";
import {
  HERO_IMAGE_SIZE,
  findDeviceById,
  getDevicePlaceholder,
  getIdentifier,
  getLineName,
  getProductName,
  getShortName,
  getThumbnailUrl,
} from "../data/devices";
import "./DeviceDetailsPage.css";

const NOT_AVAILABLE = "Not specified";

function DeviceDetailsPage() {
  const { deviceId } = useParams<{ deviceId: string }>();
  const device = findDeviceById(deviceId);

  if (!device) {
    return (
      <section className="device-details">
        <div className="device-details__empty" role="status">
          <p>
            We couldn&apos;t find a device for ID “{deviceId ?? "unknown"}”.
          </p>
          <Link className="device-details__cta" to="/devices">
            Back to device list
          </Link>
        </div>
      </section>
    );
  }

  const productName = getProductName(device);
  const lineName = getLineName(device);
  const identifier = getIdentifier(device);
  const shortName = getShortName(device) ?? NOT_AVAILABLE;
  const heroImage = getThumbnailUrl(device, HERO_IMAGE_SIZE) ?? null;
  const placeholderInitial = getDevicePlaceholder(device);
  const rawJson = JSON.stringify(device, null, 2);

  const specs: Array<{ label: string; value: string }> = [
    { label: "Product Line", value: lineName },
    { label: "ID", value: identifier },
    { label: "Name", value: productName },
    { label: "Short Name", value: shortName },
    { label: "Max. Power", value: NOT_AVAILABLE },
    { label: "Speed", value: NOT_AVAILABLE },
    { label: "Number of Ports", value: NOT_AVAILABLE },
  ];

  return (
    <section aria-labelledby="device-details-title" className="device-details">
      <Link to="/devices" className="device-details__back-link">
        ← Devices
      </Link>
      <div className="device-details__panel">
        <div className="device-details__media" aria-hidden={!heroImage}>
          {heroImage ? (
            <img
              src={heroImage}
              alt={`${productName} product`}
              className="device-details__image"
              loading="lazy"
            />
          ) : (
            <span className="device-details__media-placeholder">
              {placeholderInitial}
            </span>
          )}
        </div>
        <div className="device-details__body">
          <header className="device-details__header">
            <h1 id="device-details-title" className="device-details__title">
              {productName}
            </h1>
            <p className="device-details__line">{lineName}</p>
          </header>
          <dl className="device-details__specs">
            {specs.map(({ label, value }) => (
              <div className="device-details__spec-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Collapsible.Root className="device-details__raw">
        <Collapsible.Trigger className="device-details__raw-trigger">
          See All Details as JSON
        </Collapsible.Trigger>
        <Collapsible.Panel className="device-details__raw-panel">
          <pre className="device-details__raw-code">{rawJson}</pre>
        </Collapsible.Panel>
      </Collapsible.Root>
    </section>
  );
}

export default DeviceDetailsPage;
