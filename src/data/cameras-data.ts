import type { CameraType } from "../lib/types/camera"

import cam1 from "../assets/cam1.png"
import cam1Var1 from "../assets/cam1-var1.png"
import cam1Var2 from "../assets/cam1-var2.png"
import cam1Var3 from "../assets/cam1-var3.png"
import cam2 from "../assets/cam2.png"
import cam2Var1 from "../assets/cam2-var1.png"
import cam2Var2 from "../assets/cam2-var2.png"
import cam3 from "../assets/cam3.png"
import cam3Var1 from "../assets/cam3-var1.png"
import cam3Var2 from "../assets/cam3-var2.png"
import cam4 from "../assets/cam4.png"
import cam5 from "../assets/cam5.png"

const cameras: CameraType[] = [
  {
    id: 1,
    title: "Wyze Cam v4",
    image: { id: 1, url: cam1 },
    description: "The clearest Wyze Cam ever made.",
    price: 35.98,
    discount: 22,
    variations: [
      {
        id: 1,
        quantity: 1,
        color: {
          id: 1,
          title: "White",
          image: { id: 1, url: cam1Var1 },
        },
      },
      {
        id: 2,
        quantity: 0,
        color: {
          id: 2,
          title: "Grey",
          image: { id: 2, url: cam1Var2 },
        },
      },
      {
        id: 3,
        quantity: 0,
        color: {
          id: 3,
          title: "Black",
          image: { id: 3, url: cam1Var3 },
        },
      },
    ],
  },
  {
    id: 2,
    title: "Wyze Cam Pan v3",
    image: { id: 2, url: cam2 },
    description: "360° pan and 180° tilt security camera.",
    price: 39.98,
    discount: 12,
    variations: [
      {
        id: 1,
        quantity: 2,
        color: {
          id: 1,
          title: "White",
          image: { id: 1, url: cam2Var1 },
        },
      },
      {
        id: 2,
        quantity: 0,
        color: {
          id: 3,
          title: "Black",
          image: { id: 3, url: cam2Var2 },
        },
      },
    ],
  },
  {
    id: 3,
    title: "Wyze Cam Floodlight v2",
    image: { id: 3, url: cam3 },
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    price: 89.98,
    discount: 22,
    variations: [
      {
        id: 1,
        quantity: 0,
        color: {
          id: 1,
          title: "White",
          image: { id: 1, url: cam3Var1 },
        },
      },
      {
        id: 2,
        quantity: 0,
        color: {
          id: 3,
          title: "Black",
          image: { id: 3, url: cam3Var2 },
        },
      },
    ],
  },
  {
    id: 4,
    title: "Wyze Duo Cam Doorbell",
    image: { id: 4, url: cam4 },
    description: "Two cameras. Two views. Double the porch protection.",
    price: 69.98,
    discount: 0,
    variations: [
      {
        id: 1,
        quantity: 0,
        color: null,
      },
    ],
  },
  {
    id: 5,
    title: "Wyze Battery Cam Pro",
    image: { id: 5, url: cam5 },
    description:
      "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    price: 89.98,
    discount: 0,
    variations: [
      {
        id: 1,
        quantity: 0,
        color: {
          id: 1,
          title: "White",
          image: { id: 1, url: cam5 },
        },
      },
      {
        id: 2,
        quantity: 0,
        color: {
          id: 3,
          title: "Black",
          image: { id: 3, url: cam5 },
        },
      },
    ],
  },
]

export default cameras
