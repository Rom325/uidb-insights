import { ScrollArea } from "@base-ui-components/react/scroll-area";
import { Link } from "react-router-dom";
import type { DeviceRecord } from "../../data/devices";
import {
  DEFAULT_THUMBNAIL_SIZE,
  getDevicePlaceholder,
  getLineName,
  getProductName,
  getThumbnailUrl,
} from "../../data/devices";
import "./DeviceTable.css";

type DeviceTableProps = {
  devices: DeviceRecord[];
  thumbnailSize?: number;
};

function DeviceTable({
  devices,
  thumbnailSize = DEFAULT_THUMBNAIL_SIZE,
}: DeviceTableProps) {
  return (
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
                const productName = getProductName(device);
                const lineName = getLineName(device);
                const thumbnail = renderThumbnail(device, productName, thumbnailSize);
                const key = getRowKey(device, index);
                const detailPath = device.id ? `/devices/${device.id}` : null;

                return (
                  <tr key={key}>
                    <td data-column="Name">
                      {detailPath ? (
                        <Link
                          to={detailPath}
                          className="device-table__line-cell device-table__link"
                        >
                          {thumbnail}
                          <span>{productName}</span>
                        </Link>
                      ) : (
                        <span className="device-table__line-cell">
                          {thumbnail}
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
  );
}

export default DeviceTable;

function renderThumbnail(
  device: DeviceRecord,
  productName: string,
  size: number
) {
  const thumbnailUrl = getThumbnailUrl(device, size);
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={`${productName} thumbnail`}
        className="device-table__thumbnail"
        width={size}
        height={size}
        loading="lazy"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="device-table__thumbnail device-table__thumbnail--placeholder"
    >
      {getDevicePlaceholder(device)}
    </span>
  );
}

function getRowKey(device: DeviceRecord, index: number) {
  if (device.id) return device.id;
  return `${device.line?.id ?? "line"}-${device.product?.name ?? index}`;
}
