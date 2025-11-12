import { ScrollArea } from "@base-ui-components/react/scroll-area";
import devicesJson from "../public.json" assert { type: "json" };
import "./DeviceListPage.css";

type DeviceRecord = {
  id?: string;
  line?: { id?: string; name?: string };
  product?: { name?: string };
  images?: { default?: string };
};

const devices: DeviceRecord[] = Array.isArray(devicesJson?.devices)
  ? (devicesJson.devices as DeviceRecord[])
  : [];

const FALLBACK_LINE_NAME = "Unknown line";
const FALLBACK_PRODUCT_NAME = "Unnamed device";
const DEFAULT_THUMBNAIL_SIZE = 25;

function DeviceListPage() {
  const hasDevices = devices.length > 0;
  const size = DEFAULT_THUMBNAIL_SIZE;

  return (
    <section aria-labelledby="device-list-title" className="device-list">
      <div>
        <h1 id="device-list-title">Devices</h1>
        <p className="device-list__subtitle">
          Browse the latest product lines and devices from the offline dataset.
        </p>
      </div>
      {hasDevices ? (
        <ScrollArea.Root className="device-table__scroll-area">
          <ScrollArea.Viewport className="device-table__viewport">
            <ScrollArea.Content>
              <table className="device-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Product Line</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => {
                    const thumbnailUrl = getThumbnailUrl(device, size);
                    const productName = getProductName(device);
                    const lineName = getLineName(device);
                    const key = getKey(device, index);

                    return (
                      <tr key={key}>
                        <td data-column="Name">
                          <div className="device-table__line-cell">
                            {thumbnailUrl ? (
                              <img
                                src={thumbnailUrl}
                                alt={`${productName} thumbnail`}
                                className="device-table__thumbnail"
                                width={size}
                                height={size}
                                loading="lazy"
                              />
                            ) : (
                              <div
                                aria-hidden="true"
                                className="device-table__thumbnail device-table__thumbnail--placeholder"
                              >
                                {productName.charAt(0)}
                              </div>
                            )}
                            <span>{productName}</span>
                          </div>
                        </td>
                        <td>{lineName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      ) : (
        <p className="device-table__empty" role="status">
          No devices found in the local dataset.
        </p>
      )}
    </section>
  );
}

export default DeviceListPage;

function getKey(device: DeviceRecord, index: number) {
  return (
    device.id ?? `${device.line?.id ?? "line"}-${device.product?.name ?? index}`
  );
}

function getLineName(device: DeviceRecord) {
  return device.line?.name?.trim() || FALLBACK_LINE_NAME;
}

function getProductName(device: DeviceRecord) {
  return device.product?.name?.trim() || FALLBACK_PRODUCT_NAME;
}

function getThumbnailUrl(device: DeviceRecord, size = DEFAULT_THUMBNAIL_SIZE) {
  const deviceId = device.id;
  const fingerprintId = device.images?.default;

  if (!deviceId || !fingerprintId) {
    return null;
  }

  const fingerprintUrl = encodeURIComponent(
    `https://static.ui.com/fingerprint/ui/images/${deviceId}/default/${fingerprintId}.png`
  );

  return `https://images.svc.ui.com/?u=${fingerprintUrl}&w=${size}&q=75`;
}
