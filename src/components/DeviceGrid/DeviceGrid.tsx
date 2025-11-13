import { Link } from "react-router-dom";
import { ScrollArea } from "@base-ui-components/react/scroll-area";
import type { DeviceRecord } from "../../data/devices";
import {
  getDevicePlaceholder,
  getIdentifier,
  getLineName,
  getProductName,
  getShortName,
  getThumbnailUrl,
} from "../../data/devices";
import "./DeviceGrid.css";

type DeviceGridProps = {
  devices: DeviceRecord[];
  thumbnailSize?: number;
};

const GRID_THUMBNAIL_SIZE = 128;

function DeviceGrid({
  devices,
  thumbnailSize = GRID_THUMBNAIL_SIZE,
}: DeviceGridProps) {
  return (
    <ScrollArea.Root className="device-grid-area">
      <ScrollArea.Viewport className="device-grid__viewport">
        <ScrollArea.Content>
          <div className="device-grid" role="list">
            {devices.map((device, index) => {
              const productName = getProductName(device);
              const lineName = getLineName(device);
              const secondaryLabel =
                getShortName(device) ??
                device.product?.abbrev ??
                device.sku ??
                getIdentifier(device);
              const thumbnail = renderThumbnail(
                device,
                productName,
                thumbnailSize
              );
              const key = getCardKey(device, index);
              const detailPath = device.id ? `/devices/${device.id}` : null;

              const cardContent = (
                <>
                  <div className="device-grid__media">
                    {thumbnail}
                    <span className="device-grid__badge">{lineName}</span>
                  </div>
                  <div className="device-grid__body">
                    <p className="device-grid__title">{productName}</p>
                    <p className="device-grid__subtitle">{secondaryLabel}</p>
                  </div>
                </>
              );

              if (detailPath) {
                return (
                  <Link
                    key={key}
                    to={detailPath}
                    className="device-grid__card device-grid__card--link"
                    role="listitem"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={key} className="device-grid__card" role="listitem">
                  {cardContent}
                </div>
              );
            })}
          </div>
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

export default DeviceGrid;

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
        alt={`${productName} product`}
        className="device-grid__image"
        loading="lazy"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="device-grid__image device-grid__image--placeholder"
    >
      {getDevicePlaceholder(device)}
    </span>
  );
}

function getCardKey(device: DeviceRecord, index: number) {
  if (device.id) return `grid-${device.id}`;
  return `grid-${device.line?.id ?? "line"}-${device.product?.name ?? index}`;
}
