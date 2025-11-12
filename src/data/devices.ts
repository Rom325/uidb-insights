import rawDevices from "../public.json" assert { type: "json" };

export type DeviceRecord = {
  id?: string;
  deviceType?: string;
  line?: { id?: string; name?: string } | null;
  product?: { name?: string; abbrev?: string } | null;
  images?: { default?: string } | null;
  shortnames?: string[];
  sku?: string;
  sysid?: string;
  sysids?: string[];
};

const FALLBACK_LINE_NAME = "Unknown line";
const FALLBACK_PRODUCT_NAME = "Unnamed device";
const FALLBACK_IDENTIFIER = "Unknown identifier";

export const DEFAULT_THUMBNAIL_SIZE = 25;
export const HERO_IMAGE_SIZE = 256;

export const devices: DeviceRecord[] = Array.isArray(rawDevices?.devices)
  ? (rawDevices.devices as DeviceRecord[])
  : [];

export function getDevices() {
  return devices;
}

export function findDeviceById(id?: string | null) {
  if (!id) {
    return undefined;
  }

  return devices.find((device) => device.id === id);
}

export function getLineName(device?: DeviceRecord) {
  if (!device) {
    return FALLBACK_LINE_NAME;
  }

  return device.line?.name?.trim() || FALLBACK_LINE_NAME;
}

export function getProductName(device?: DeviceRecord) {
  if (!device) {
    return FALLBACK_PRODUCT_NAME;
  }

  return device.product?.name?.trim() || FALLBACK_PRODUCT_NAME;
}

export function getIdentifier(device?: DeviceRecord) {
  if (!device) {
    return FALLBACK_IDENTIFIER;
  }

  return device.line?.id?.trim() || device.id?.trim() || FALLBACK_IDENTIFIER;
}

export function getShortName(device?: DeviceRecord) {
  if (!device?.shortnames || device.shortnames.length === 0) {
    return null;
  }

  return device.shortnames[0];
}

export function getThumbnailUrl(
  device?: DeviceRecord,
  size = DEFAULT_THUMBNAIL_SIZE
) {
  if (!device?.id || !device.images?.default) {
    return null;
  }

  const fingerprintUrl = encodeURIComponent(
    `https://static.ui.com/fingerprint/ui/images/${device.id}/default/${device.images.default}.png`
  );

  return `https://images.svc.ui.com/?u=${fingerprintUrl}&w=${size}&q=75`;
}

export function getDevicePlaceholder(device?: DeviceRecord) {
  const source =
    getProductName(device) ||
    getLineName(device) ||
    device?.shortnames?.[0] ||
    "U";

  return source.charAt(0).toUpperCase();
}
