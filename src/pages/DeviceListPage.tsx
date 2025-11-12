import { useMemo, useState } from "react";
import DeviceSearch from "../components/DeviceSearch/DeviceSearch";
import type { DeviceSearchItem } from "../components/DeviceSearch/DeviceSearch";
import LineFilter from "../components/LineFilter/LineFilter";
import type { LineFilterOption } from "../components/LineFilter/LineFilter";
import DeviceTable from "../components/DeviceTable/DeviceTable";
import {
  getDeviceSearchText,
  getDevices,
  getLineId,
  getLineName,
  getProductName,
} from "../data/devices";
import "./DeviceListPage.css";

const MAX_SUGGESTIONS = 8;

function DeviceListPage() {
  const devices = getDevices();
  const [searchValue, setSearchValue] = useState("");
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const normalizedSearch = searchValue.trim().toLowerCase();

  const searchItems = useMemo<DeviceSearchItem[]>(
    () =>
      devices.map((device, index) => ({
        id: device.id ?? `device-${index}`,
        label: getProductName(device),
        secondary: getLineName(device),
        searchText: getDeviceSearchText(device),
        deviceId: device.id,
      })),
    [devices]
  );

  const lineOptions = useMemo<LineFilterOption[]>(() => {
    const map = new Map<string, LineFilterOption>();

    devices.forEach((device) => {
      const lineId = getLineId(device);
      const name = getLineName(device);
      const existing = map.get(lineId);

      if (existing) {
        existing.count += 1;
      } else {
        map.set(lineId, { id: lineId, name, count: 1 });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [devices]);

  const suggestions = useMemo<DeviceSearchItem[]>(() => {
    const source = normalizedSearch
      ? searchItems.filter((item) =>
          item.searchText?.includes(normalizedSearch)
        )
      : searchItems;

    return source.slice(0, MAX_SUGGESTIONS);
  }, [searchItems, normalizedSearch]);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch = normalizedSearch
        ? getDeviceSearchText(device).includes(normalizedSearch)
        : true;
      const matchesLine =
        selectedLines.length === 0 || selectedLines.includes(getLineId(device));
      return matchesSearch && matchesLine;
    });
  }, [devices, normalizedSearch, selectedLines]);

  const filteredCountLabel = `${filteredDevices.length} Device${
    filteredDevices.length === 1 ? "" : "s"
  }`;
  const hasResults = filteredDevices.length > 0;

  const toggleLineSelection = (lineId: string) => {
    setSelectedLines((current) =>
      current.includes(lineId)
        ? current.filter((id) => id !== lineId)
        : [...current, lineId]
    );
  };

  const clearFilters = () => {
    setSelectedLines([]);
  };

  return (
    <section aria-labelledby="device-list-title" className="device-list">
      <div className="device-list__intro">
        <div>
          <h1 id="device-list-title">Devices</h1>
          <p className="device-list__subtitle">
            Browse the latest product lines and devices from the offline
            dataset.
          </p>
        </div>
        <div className="device-toolbar">
          <div className="device-toolbar__left">
            <DeviceSearch
              items={suggestions}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <span className="device-toolbar__count">{filteredCountLabel}</span>
          </div>
          <div className="device-toolbar__right">
            <div
              className="device-toolbar__view-toggle"
              role="group"
              aria-label="Display mode"
            >
              <button
                type="button"
                className="device-toolbar__icon-button"
                aria-pressed={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                <ListViewIcon />
                <span className="sr-only">List view</span>
              </button>
              <button
                type="button"
                className="device-toolbar__icon-button"
                aria-pressed={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                <GridViewIcon />
                <span className="sr-only">Grid view</span>
              </button>
            </div>
            <LineFilter
              options={lineOptions}
              selectedIds={selectedLines}
              onToggle={toggleLineSelection}
              onClear={clearFilters}
            />
          </div>
        </div>
      </div>
      {hasResults ? (
        <DeviceTable devices={filteredDevices} />
      ) : (
        <p className="device-table__empty" role="status">
          {devices.length === 0
            ? "No devices found in the local dataset."
            : "No devices match your search and filter selection."}
        </p>
      )}
    </section>
  );
}

export default DeviceListPage;

function ListViewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 5h12M4 10h12M4 15h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridViewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 4h4v4H4V4zm0 8h4v4H4v-4zm8-8h4v4h-4V4zm0 8h4v4h-4v-4z"
        fill="currentColor"
      />
    </svg>
  );
}
