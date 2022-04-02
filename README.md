# RMU (React modal utility)

RMU is a small, zero-dependency utility to control modals in React apps.

<!-- ## Installation

```bash
npm install --save rmu
yarn add rmu
``` -->

## Usage

```js
import { openModal, closeModal, RMUOutlet, RMUProvider } from 'rmu';

const Example = () => {
  return (
    <RMUProvider>
       <button
        onClick={() => {
          const modal = openModal(
            <TestModal onClose={() => closeModal(modal)} />
          );
        }}
      >
        Open modal
      </button>
      <SomeContextProvider>
        <button onClick={() => {
          const modal = openModal(
            <TestContextModal onClose={() => closeModal(modal)} />,
            { outletId: 'MY_OUTLET' },
          );
        }}>
          Open modal with access to some context
        </button>
        <RMUOutlet outletId="MY_OUTLET">
      </SomeContextProvider>
      <RMUOutlet />
    </RMUProvider>
  );
};
```

## RoadMap
- [x] Custom events, new API (0.2.0)
- [ ] Connected modals (Context modals)
- [ ] Auto-close 
- [ ] Use for toasts example

## License

Licensed under MIT
