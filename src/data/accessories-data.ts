import type { AccessoryType } from "../lib/types/accessory"
import accessories1 from "../assets/accessories1.png"

const accessories: AccessoryType[] = [
  {
    id: 1,
    title: "Wyze Cam Outdoor Wall Mount",
    description: "Weather-resistant wall mount for Wyze Cam Outdoor.",
    quantity: 0,
    image: { id: 1, url: accessories1 },
    type: "Mount",
    price: 12.99,
    discount: 0,
  },
  {
    id: 2,
    title: "Wyze Power Adapter (5V 2A)",
    description: "Replacement or extra power adapter for your Wyze cameras.",
    quantity: 0,
    image: { id: 2, url: accessories1 },
    type: "Power",
    price: 8.99,
    discount: 10,
  },
  {
    id: 3,
    title: "Wyze Mounting Kit (14-Piece)",
    description: "Complete kit with anchors and screws for easy installation.",
    quantity: 0,
    image: { id: 3, url: accessories1 },
    type: "Mount",
    price: 7.99,
    discount: 0,
  },
]

export default accessories
