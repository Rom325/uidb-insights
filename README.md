A tool to verify, share and align on insights about Ubiquit’s products and their images. Uses **off-line dataset**.

<img width="1512" height="950" alt="image" src="https://github.com/user-attachments/assets/cc822cf1-770e-4846-9234-abe8d49564d3" />


## Features
1. View devices as list and as grid
2. Search, filter by product line.
3. View product details and view raw json for the product.

## Notes
- Built with a11y in mind and provided good foundation for further a11y improvements. I suggest e.g. keyboard arrow navigation for list / grid items as a possible improvements.
- Adhered to the design system where feasible despite not having access to the original design system components.
- Performance optimizations include lazy image loading & usage of React 19 features like useDeferredValue & startTransition. Further imporovements can include virtualize rendering for list & grid (alt. pagination), usage of src-set & preload for grid/product details images. 
- Testing was not in scope but should be of course added in case of further development.

## Tech notes
1. Additional libraries used: react-router and base-ui.
2. Bundled with Vite.
   


