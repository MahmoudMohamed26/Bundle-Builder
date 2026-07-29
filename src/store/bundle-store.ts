import { create } from "zustand";

interface CameraSelection {
  cameraId: number;
  variationId: number;
  quantity: number;
}

interface SensorSelection {
  sensorId: number;
  quantity: number;
}

interface AccessorySelection {
  accessoryId: number;
  quantity: number;
}

interface BundleStore {
  cameras: CameraSelection[];
  sensors: SensorSelection[];
  accessories: AccessorySelection[];
  plan: number | null;

  setCameraVariationQty: (cameraId: number, variationId: number, qty: number) => void;
  setSensorQty: (sensorId: number, qty: number) => void;
  setAccessoryQty: (accessoryId: number, qty: number) => void;
  setPlan: (planId: number | null) => void;
  saveForLater: () => void;
}

const STORAGE_KEY = "bundle-builder";

const defaultState = {
  cameras: [
    { cameraId: 1, variationId: 1, quantity: 1 },
    { cameraId: 2, variationId: 1, quantity: 2 },
  ],
  sensors: [
    { sensorId: 1, quantity: 2 },
    { sensorId: 2, quantity: 1 },
  ],
  accessories: [{ accessoryId: 1, quantity: 2 }],
  plan: 1 as number | null,
};

function loadState(): Partial<BundleStore> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

export function saveState() {
  const s = useBundleStore.getState();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      cameras: s.cameras,
      sensors: s.sensors,
      accessories: s.accessories,
      plan: s.plan,
    }),
  );
}

const persisted = loadState();

const useBundleStore = create<BundleStore>((set) => ({
  cameras: persisted?.cameras ?? defaultState.cameras,
  sensors: persisted?.sensors ?? defaultState.sensors,
  accessories: persisted?.accessories ?? defaultState.accessories,
  plan: persisted?.plan ?? defaultState.plan,

  setCameraVariationQty: (cameraId, variationId, qty) =>
    set((state) => {
      const idx = state.cameras.findIndex(
        (c) => c.cameraId === cameraId && c.variationId === variationId,
      );
      if (qty > 0) {
        const cameras =
          idx >= 0
            ? state.cameras.map((c, i) =>
                i === idx ? { ...c, quantity: qty } : c,
              )
            : [
                ...state.cameras,
                { cameraId, variationId, quantity: qty },
              ];
        return { cameras };
      }
      return {
        cameras: state.cameras.filter(
          (_, i) => i !== idx,
        ),
      };
    }),

  setSensorQty: (sensorId, qty) =>
    set((state) => {
      const idx = state.sensors.findIndex((s) => s.sensorId === sensorId);
      if (qty > 0) {
        const sensors =
          idx >= 0
            ? state.sensors.map((s, i) =>
                i === idx ? { ...s, quantity: qty } : s,
              )
            : [...state.sensors, { sensorId, quantity: qty }];
        return { sensors };
      }
      return {
        sensors: state.sensors.filter((_, i) => i !== idx),
      };
    }),

  setAccessoryQty: (accessoryId, qty) =>
    set((state) => {
      const idx = state.accessories.findIndex(
        (a) => a.accessoryId === accessoryId,
      );
      if (qty > 0) {
        const accessories =
          idx >= 0
            ? state.accessories.map((a, i) =>
                i === idx ? { ...a, quantity: qty } : a,
              )
            : [...state.accessories, { accessoryId, quantity: qty }];
        return { accessories };
      }
      return {
        accessories: state.accessories.filter((_, i) => i !== idx),
      };
    }),

  setPlan: (planId) => set({ plan: planId }),

  saveForLater: () => saveState(),
}));

export default useBundleStore;
