import { RMUEventType } from "./types";

export const RMU_DEFAULT_OUTLET_ID = 'RMU:DEFAULT_OUTLET' as const;

export const RMU_EVENTS = {
  open: RMUEventType.OpenModal,
  close: RMUEventType.CloseModal,
} as const;
