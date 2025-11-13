import { Popover } from "@base-ui-components/react/popover";
import "./LineFilter.css";

export type LineFilterOption = {
  id: string;
  name: string;
  count: number;
};

type LineFilterProps = {
  options: LineFilterOption[];
  selectedIds: string[];
  onToggle: (lineId: string) => void;
  onClear: () => void;
};

function LineFilter({
  options,
  selectedIds,
  onToggle,
  onClear,
}: LineFilterProps) {
  const hasActiveFilters = selectedIds.length > 0;
  const filterCount = selectedIds.length;
  const filterLabel = `Filter (${filterCount})`;

  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        className="device-filter__trigger"
        data-active={hasActiveFilters ? "true" : undefined}
        aria-label={filterLabel}
      >
        <span className="device-filter__trigger-text">Filter</span>
        <span
          className="device-filter__count-chip"
          aria-live="polite"
          aria-atomic="true"
        >
          {filterCount}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="device-filter__panel">
            <div className="device-filter__header">
              <div>
                <p className="device-filter__title">Product Line</p>
                <p className="device-filter__hint">
                  Select one or multiple lines to narrow the list.
                </p>
              </div>
            </div>
            <div className="device-filter__options">
              {options.map((line) => (
                <label key={line.id} className="device-filter__option">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(line.id)}
                    onChange={() => onToggle(line.id)}
                  />
                  <span className="device-filter__option-name">
                    {line.name}
                  </span>
                  <span className="device-filter__count">{line.count}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="device-filter__clear"
              onClick={onClear}
              disabled={!hasActiveFilters}
            >
              Reset
            </button>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default LineFilter;
