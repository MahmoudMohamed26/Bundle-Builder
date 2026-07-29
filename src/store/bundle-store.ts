import { create } from "zustand";

interface BundleStore {
  cameraVariations: Record<string, number>;
  cameraVariationOrder: string[];
  sensors: Record<number, number>;
  sensorOrder: number[];
  accessories: Record<number, number>;
  accessoryOrder: number[];
  plan: number | null;

  setCameraVariationQty: (cameraId: number, variationId: number, qty: number) => void;
  setSensorQty: (sensorId: number, qty: number) => void;
  setAccessoryQty: (accessoryId: number, qty: number) => void;
  setPlan: (planId: number | null) => void;
}

const useBundleStore = create<BundleStore>((set) => ({
  cameraVariations: {},
  cameraVariationOrder: [],
  sensors: {},
  sensorOrder: [],
  accessories: {},
  accessoryOrder: [],
  plan: null,

  setCameraVariationQty: (cameraId, variationId, qty) =>
    set((state) => {
      const key = `${cameraId}-${variationId}`;
      const prev = state.cameraVariations[key] || 0;
      const order =
        prev === 0 && qty > 0
          ? [...state.cameraVariationOrder, key]
          : qty === 0
            ? state.cameraVariationOrder.filter((k) => k !== key)
            : state.cameraVariationOrder;
      return {
        cameraVariations: { ...state.cameraVariations, [key]: qty },
        cameraVariationOrder: order,
      };
    }),

  setSensorQty: (sensorId, qty) =>
    set((state) => {
      const prev = state.sensors[sensorId] || 0;
      const order =
        prev === 0 && qty > 0
          ? [...state.sensorOrder, sensorId]
          : qty === 0
            ? state.sensorOrder.filter((id) => id !== sensorId)
            : state.sensorOrder;
      return {
        sensors: { ...state.sensors, [sensorId]: qty },
        sensorOrder: order,
      };
    }),

  setAccessoryQty: (accessoryId, qty) =>
    set((state) => {
      const prev = state.accessories[accessoryId] || 0;
      const order =
        prev === 0 && qty > 0
          ? [...state.accessoryOrder, accessoryId]
          : qty === 0
            ? state.accessoryOrder.filter((id) => id !== accessoryId)
            : state.accessoryOrder;
      return {
        accessories: { ...state.accessories, [accessoryId]: qty },
        accessoryOrder: order,
      };
    }),

  setPlan: (planId) => set({ plan: planId }),
}));

export default useBundleStore;
