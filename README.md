# RMU (React modal utility)

RMU is a small, zero-dependency utility to control modals in React apps.

<!-- ## Installation 

```bash
npm install --save rmu
yarn add rmu
``` -->

## Usage

```js
import RMU, { RMUProvider } from '../../dist';
import { TEST_MODAL_ID } from './constants';
import TestModal from './TestModal';

RMU.connect(TEST_MODAL_ID, TestModal);

const Example = () => {
  return (
    <RMUProvider>
      <button
        onClick={() =>
          RMU.open(TEST_MODAL_ID, {
            children: 'Connected modal',
            onClose: () => {
              alert('Connected modal closed');
            },
          })
        }
      >
        Open connected modal
      </button>
      <button
        onClick={() =>
          RMU.open(TestModal, {
            children: 'Not connected modal',
            onClose: () => {
              alert('Not connected modal closed');
            },
          })
        }
      >
        Open not connected modal
      </button>
    </RMUProvider>
  );
};
```

## License

Licensed under MIT