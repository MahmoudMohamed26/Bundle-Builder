import type { SensorType } from "../lib/types/sensor"
import sensor1 from "../assets/sensor1.png"
import sensor2 from "../assets/sensor2.png"

const sensors: SensorType[] = [
  {
    id: 1,
    title: "Wyze Sense Motion Sensor",
    description: "Detect movement and trigger automations for your smart home.",
    quantity: 0,
    image: { id: 1, url: sensor2 },
    type: "Motion Sensor",
    price: 19.99,
    discount: 0,
  },
  {
    id: 2,
    title: "Wyze Sense Contact Sensor",
    description: "Know when doors or windows open and close.",
    quantity: 0,
    image: { id: 2, url: sensor2 },
    type: "Contact Sensor",
    price: 17.99,
    discount: 0,
  },
  {
    id: 3,
    title: "Wyze Sense Climate Sensor",
    description: "Monitor temperature and humidity in any room.",
    quantity: 0,
    image: { id: 3, url: sensor2 },
    type: "Climate Sensor",
    price: 24.99,
    discount: 10,
  },
  {
    id: 4,
    title: "Wyze MicroSD Card (256GB)",
    description: "High endurance storage for continuous recording.",
    quantity: 0,
    image: { id: 4, url: sensor1 },
    type: "Storage",
    price: 29.99,
    discount: 15,
  },
  {
    id: 5,
    title: "Wyze MicroSD Card (512GB)",
    description: "Maximum capacity for your Wyze cameras.",
    quantity: 0,
    image: { id: 5, url: sensor1 },
    type: "Storage",
    price: 54.99,
    discount: 20,
  },
]

export default sensors
