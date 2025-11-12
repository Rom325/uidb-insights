import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { Link } from "react-router-dom";
import {
  DEFAULT_THUMBNAIL_SIZE,
  getDevicePlaceholder,
  getDevices,
  getLineName,
  getProductName,
  getThumbnailUrl,
} from "../data/devices";
import "./DeviceListPage.css";

function DeviceListPage() {
  const devices = getDevices();
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
                    const key = getKey(
                      device.id,
                      device.line?.id,
                      device.product?.name,
                      index
                    );
                    const detailPath = device.id
                      ? `/devices/${device.id}`
                      : null;
                    const Thumbnail = thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={`${productName} thumbnail`}
                        className="device-table__thumbnail"
                        width={size}
                        height={size}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="device-table__thumbnail device-table__thumbnail--placeholder"
                      >
                        {getDevicePlaceholder(device)}
                      </span>
                    );

                    return (
                      <tr key={key}>
                        <td data-column="Name">
                          {detailPath ? (
                            <Link
                              to={detailPath}
                              className="device-table__line-cell device-table__link"
                            >
                              {Thumbnail}
                              <span>{productName}</span>
                            </Link>
                          ) : (
                            <span className="device-table__line-cell">
                              {Thumbnail}
                              <span>{productName}</span>
                            </span>
                          )}
                        </td>
                        <td data-column="Product Line">{lineName}</td>
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

function getKey(
  id?: string,
  lineId?: string,
  productName?: string,
  index?: number
) {
  if (id) return id;
  return `${lineId ?? "line"}-${productName ?? index ?? 0}`;
}
