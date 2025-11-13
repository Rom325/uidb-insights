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
          name="search"
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
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="device-search__icon"
    >
      <path
        d="M13.853 13.146L11.006 10.302C11.937 9.211 12.5 7.797 12.5 6.25C12.5 2.798 9.702 0 6.25 0C2.798 0 0 2.798 0 6.25C0 9.702 2.798 12.5 6.25 12.5C7.795 12.5 9.208 11.938 10.299 11.009L13.147 13.853C13.245 13.951 13.372 13.999 13.5 13.999C13.628 13.999 13.756 13.95 13.854 13.852C14.049 13.658 14.049 13.341 13.853 13.146ZM1 6.25C1 3.355 3.355 1 6.25 1C9.145 1 11.5 3.355 11.5 6.25C11.5 9.145 9.145 11.5 6.25 11.5C3.355 11.5 1 9.145 1 6.25Z"
        fill="#838691"
      />
    </svg>
  );
}
