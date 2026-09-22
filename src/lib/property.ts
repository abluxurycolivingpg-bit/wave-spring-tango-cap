export const PHONE = "9247045268";
export const PHONE_LABEL = "92470 45268";
export const WHATSAPP = `https://wa.me/91${PHONE}`;
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=12.98231,77.657238";

export const ADDRESS = [
  "H.No. 107/2, 5th Main, SG Palya",
  "CV Raman Nagar (opp. Food City)",
  "Bengaluru 560093",
];

export const ROOMS = [
  {
    name: "Private Room",
    price: "₹8,000",
    note: "Single occupancy · Non-AC",
    image: "/media/room-1.jpg",
  },
  {
    name: "Triple Sharing",
    price: "₹8,000",
    note: "3-share · Non-AC",
    image: "/media/room-2.jpg",
    featured: true,
  },
  {
    name: "Quad Sharing",
    price: "₹6,500",
    note: "4-share · Non-AC",
    image: "/media/room-1.jpg",
  },
];

export const GALLERY = [
  {
    src: "/media/building.jpg",
    label: "Building",
    detail: "White tower on SG Palya. Gated parking, gold AB board, blue PG sign.",
  },
  {
    src: "/media/room-1.jpg",
    label: "Private bed",
    detail: "Queen bed, gold geometric linen, tube light, attached-bath door.",
  },
  {
    src: "/media/room-2.jpg",
    label: "Room view",
    detail: "Dark marble floor, mirrored wardrobe, blackout curtains, ceiling fan.",
  },
  {
    src: "/media/gym-1.jpg",
    label: "Cardio gym",
    detail: "Spin bikes, dumbbell rack, blue LED roof, rooftop after dark.",
  },
  {
    src: "/media/gym-2.jpg",
    label: "Strength gym",
    detail: "Hercules multi-gym, benches, plates. Same terrace as the games deck.",
  },
  {
    src: "/media/games.jpg",
    label: "Games terrace",
    detail: "Turf, hanging lamps, tables. Gym on the left, hangout on the right.",
  },
  {
    src: "/media/fridge.jpg",
    label: "Fridge",
    detail: "Common Godrej fridge beside the kitchen door.",
  },
  {
    src: "/media/tv.jpg",
    label: "Common TV",
    detail: "Wall TV over the marble kitchen splash — house rules posted below.",
  },
  { src: "/media/logo.jpg", label: "AB mark", detail: "Brass AB disc on fluted gold panelling." },
];

export const TOUR = GALLERY.filter((g) => g.src !== "/media/logo.jpg");
