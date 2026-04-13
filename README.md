# RMU (React Modal Utility)

[![npm version](https://badge.fury.io/js/@violice%2Frmu.svg)](https://www.npmjs.com/package/@violice/rmu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, zero-dependency utility for managing modals in React applications. Built with TypeScript, supports multiple outlets, and works seamlessly with React context.

## Features

- **Zero Dependencies** - No external libraries required
- **TypeScript** - Full type safety out of the box
- **Multiple Outlets** - Render modals in different parts of your app
- **Context-Aware** - Modals have access to React context at their outlet location
- **Imperative API** - Open/close modals from anywhere without prop drilling
- **Lightweight** - < 2KB gzipped
- **React Native Support** - Works with both React DOM and React Native

## Installation

```bash
npm install @violice/rmu
# or
yarn add @violice/rmu
# or
pnpm add @violice/rmu
```

## Requirements

- React >= 19
- Node.js >= 24

## Quick Start

### 1. Wrap your app with `RMUProvider`

```tsx
import { RMUProvider } from '@violice/rmu';

function App() {
  return (
    <RMUProvider>
      <YourApp />
    </RMUProvider>
  );
}
```

### 2. Add `RMUOutlet` where you want modals to render

```tsx
import { RMUOutlet } from '@violice/rmu';

function Layout() {
  return (
    <div>
      <main>{/* Your page content */}</main>
      <RMUOutlet /> {/* Modals will render here */}
    </div>
  );
}
```

### 3. Open modals from anywhere

```tsx
import { openModal, closeModal } from '@violice/rmu';

function MyComponent() {
  const handleOpenModal = () => {
    const modal = openModal(
      <MyModal onClose={() => closeModal(modal)} />
    );
  };

  return <button onClick={handleOpenModal}>Open Modal</button>;
}
```

## API Reference

### Components

#### `RMUProvider`

Root provider component that must wrap your application or the part of the app that uses modals.

```tsx
interface RMUProviderProps {
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<RMUProvider>
  <App />
</RMUProvider>
```

#### `RMUOutlet`

Component that renders modals. Multiple outlets can be used with different IDs to render modals in different locations.

```tsx
interface RMUOutletProps {
  outletId?: string; // Default: 'RMU:DEFAULT_OUTLET'
}
```

**Usage:**
```tsx
// Default outlet
<RMUOutlet />

// Custom outlet
<RMUOutlet outletId="sidebar-outlet" />
```

### Functions

#### `openModal(component, config?)`

Opens a modal and returns its identifier.

```tsx
function openModal(
  component: React.ReactNode,
  config?: { outletId?: string }
): { modalId: string; outletId: string }
```

**Parameters:**
- `component` - React element to render as modal
- `config.outletId` - Optional outlet ID (defaults to default outlet)

**Returns:**
- `modalId` - Unique identifier for the modal
- `outletId` - The outlet where the modal is rendered

**Usage:**
```tsx
const { modalId, outletId } = openModal(<MyModal />, {
  outletId: 'custom-outlet'
});
```

#### `closeModal({ modalId, outletId })`

Closes a specific modal by its identifier.

```tsx
function closeModal({
  modalId: string,
  outletId: string
}): void
```

**Usage:**
```tsx
const modal = openModal(<MyModal />);
// ... later
closeModal(modal);
```

## Advanced Usage

### Multiple Outlets with Context Access

One of RMU's key features is the ability to render modals in different outlets, allowing them to access React context at that location.

```tsx
import { RMUProvider, RMUOutlet, openModal, closeModal } from '@violice/rmu';
import { ThemeContext, UserContext } from './contexts';

function App() {
  return (
    <RMUProvider>
      <ThemeContext.Provider value="dark">
        {/* Modals here have access to ThemeContext */}
        <RMUOutlet outletId="theme-aware" />
        
        <UserContext.Provider value={{ name: 'John' }}>
          {/* Modals here have access to both contexts */}
          <RMUOutlet outletId="user-aware" />
          
          <button onClick={() => {
            const modal = openModal(<UserProfileModal />, {
              outletId: 'user-aware'
            });
          }}>
            Open User Modal
          </button>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </RMUProvider>
  );
}
```

### Managing Multiple Modals

```tsx
function MultipleModalsExample() {
  const modalsRef = useRef<Array<{ modalId: string; outletId: string }>>([]);

  const openFirstModal = () => {
    const modal = openModal(
      <Modal1 onClose={() => closeModal(modal)} />
    );
    modalsRef.current.push(modal);
  };

  const openSecondModal = () => {
    const modal = openModal(
      <Modal2 onClose={() => closeModal(modal)} />
    );
    modalsRef.current.push(modal);
  };

  const closeAllModals = () => {
    modalsRef.current.forEach(modal => closeModal(modal));
    modalsRef.current = [];
  };

  return (
    <div>
      <button onClick={openFirstModal}>Open Modal 1</button>
      <button onClick={openSecondModal}>Open Modal 2</button>
      <button onClick={closeAllModals}>Close All</button>
    </div>
  );
}
```

### Complete Modal Component Example

```tsx
interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal({ title, message, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// Usage
function MyComponent() {
  const handleDelete = () => {
    const modal = openModal(
      <ConfirmModal
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onConfirm={() => console.log('Deleted!')}
        onClose={() => closeModal(modal)}
      />
    );
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## How It Works

RMU uses a combination of patterns to provide its functionality:

1. **Event Emitter** - A custom event system allows imperative `openModal()`/`closeModal()` calls from anywhere
2. **React Context** - `RMUProvider` maintains state and provides it to the component tree
3. **Reducer Pattern** - State updates are handled through a reducer for predictable state management
4. **Outlet System** - Multiple named outlets allow flexible modal placement

```
┌─────────────────────────────────────┐
│           RMUProvider               │
│  ┌───────────────────────────────┐  │
│  │        State (Reducer)        │  │
│  │   outlets: {                  │  │
│  │     'default': {              │  │
│  │       'modal-1': <ModalA />,  │  │
│  │       'modal-2': <ModalB />   │  │
│  │     }                         │  │
│  │   }                           │  │
│  └───────────────────────────────┘  │
│              │                      │
│              ▼                      │
│  ┌───────────────────────────────┐  │
│  │         RMUOutlet             │  │
│  │     Renders: <ModalA />       │  │
│  │              <ModalB />       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
              ▲
              │ Events
       openModal() / closeModal()
```

## TypeScript

RMU is written in TypeScript and provides full type safety.

```tsx
import type { OpenModalPayload, CloseModalPayload } from '@violice/rmu';

// Types are available for advanced use cases
const handleOpen = (payload: OpenModalPayload) => {
  console.log(payload.modalId, payload.outletId);
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Check bundle size
npm run size
```

## License

Licensed under [MIT](LICENSE).

---

**Made with ❤️ by [Sergey Ivashko](https://github.com/violice)**
