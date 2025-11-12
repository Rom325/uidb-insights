import { Autocomplete } from "@base-ui-components/react/autocomplete";
import { useCallback } from "react";
import "./DeviceSearch.css";

export type DeviceSearchItem = {
  id: string;
  label: string;
  secondary: string;
  searchText?: string;
};

type DeviceSearchProps = {
  items: DeviceSearchItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

function DeviceSearch({
  items,
  value,
  onValueChange,
  placeholder = "Search",
}: DeviceSearchProps) {
  const handleSelect = useCallback(
    (item: DeviceSearchItem) => {
      onValueChange(item.label);
    },
    [onValueChange]
  );

  return (
    <Autocomplete.Root
      items={items}
      value={value}
      onValueChange={onValueChange}
      itemToStringValue={(item) => item?.label ?? ""}
      mode="none"
    >
      <div className="device-search__field">
        <SearchIcon />
        <Autocomplete.Input
          placeholder={placeholder}
          aria-label="Search devices"
          className="device-search__input"
        />
      </div>
      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={4}>
          <Autocomplete.Popup className="device-search__popup">
            <Autocomplete.Empty className="device-search__empty">
              No matches found
            </Autocomplete.Empty>
            <Autocomplete.List className="device-search__list">
              {(item: DeviceSearchItem) => (
                <Autocomplete.Item
                  key={item.id}
                  value={item}
                  className="device-search__item"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    handleSelect(item);
                  }}
                  onClick={() => handleSelect(item)}
                >
                  <span className="device-search__item-label">
                    {item.label}
                  </span>
                  <span className="device-search__item-line">
                    {item.secondary}
                  </span>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

export default DeviceSearch;

function SearchIcon() {
  return (
    <svg
      className="device-search__icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        d="M11.742 10.344a6 6 0 10-1.397 1.398l3.262 3.263a1 1 0 001.415-1.415l-3.28-3.246zM6.5 11a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
        fill="currentColor"
      />
    </svg>
  );
}
