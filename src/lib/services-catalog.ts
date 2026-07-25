/**
 * Local service catalog for the booking picker.
 *
 * The data source for these services used to be Acuity's REST API
 * (see /ai/flows/acuity-booking-flow.ts, removed). After the migration
 * to GlossGenius, the embed handles real-time availability and pricing
 * at booking time. This file only powers the pre-booking picker UI on
 * /book, so the values here are display-only marketing copy.
 *
 * Keep this list in sync with the live GlossGenius service menu.
 * The salon owner can update prices, durations, and images here.
 */

export type Gender = 'female' | 'male';
export type Area = 'face' | 'mid' | 'low';

export interface ServiceCatalogEntry {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  duration: number;
  gender: Gender;
  area: Area;
  /** Optional display order within its area. Lower numbers render first. */
  order?: number;
}

const FALLBACK_IMAGE = 'https://static.wixstatic.com/media/c5947c_105b98aad40c4d4c8ca7de374634e9fa~mv2.png';

export const SERVICES_CATALOG: ServiceCatalogEntry[] = [
  // ─── Female Face ─────────────────────────────────────────────────────
  {
    id: 'brow-wax',
    name: 'Brow Wax',
    description: 'Sculpted, clean brows shaped to flatter your face.',
    image: FALLBACK_IMAGE,
    price: '25',
    duration: 15,
    gender: 'female',
    area: 'face',
    order: 1,
  },
  {
    id: 'lip-wax',
    name: 'Lip Wax',
    description: 'Quick, gentle upper-lip hair removal for a smooth finish.',
    image: FALLBACK_IMAGE,
    price: '15',
    duration: 10,
    gender: 'female',
    area: 'face',
    order: 2,
  },
  {
    id: 'chin-wax',
    name: 'Chin Wax',
    description: 'Targeted chin hair removal for a clean, even complexion.',
    image: FALLBACK_IMAGE,
    price: '15',
    duration: 10,
    gender: 'female',
    area: 'face',
    order: 3,
  },
  {
    id: 'sideburn-wax',
    name: 'Sideburn Wax',
    description: 'Tidy up sideburns with a clean, precise line.',
    image: FALLBACK_IMAGE,
    price: '25',
    duration: 15,
    gender: 'female',
    area: 'face',
    order: 4,
  },
  {
    id: 'full-face-wax',
    name: 'Full Face Wax',
    description: 'Brows, lip, chin, and sideburns — the full glow-up.',
    image: FALLBACK_IMAGE,
    price: '65',
    duration: 30,
    gender: 'female',
    area: 'face',
    order: 5,
  },

  // ─── Female Mid Body ─────────────────────────────────────────────────
  {
    id: 'underarm-wax',
    name: 'Underarm Wax',
    description: 'Smooth, fresh underarms in minutes with gentle hard wax.',
    image: FALLBACK_IMAGE,
    price: '25',
    duration: 15,
    gender: 'female',
    area: 'mid',
    order: 1,
  },
  {
    id: 'half-arm-wax',
    name: 'Half Arm Wax',
    description: 'Lower or upper arm waxing for a sleek, hair-free look.',
    image: FALLBACK_IMAGE,
    price: '35',
    duration: 20,
    gender: 'female',
    area: 'mid',
    order: 2,
  },
  {
    id: 'full-arm-wax',
    name: 'Full Arm Wax',
    description: 'Complete arm waxing from shoulder to fingertip line.',
    image: FALLBACK_IMAGE,
    price: '55',
    duration: 30,
    gender: 'female',
    area: 'mid',
    order: 3,
  },
  {
    id: 'back-wax',
    name: 'Back Wax',
    description: 'Full back waxing for clean, confident skin.',
    image: FALLBACK_IMAGE,
    price: '65',
    duration: 30,
    gender: 'female',
    area: 'mid',
    order: 4,
  },
  {
    id: 'stomach-wax',
    name: 'Stomach Wax',
    description: 'Smooth stomach waxing for a clean, even tone.',
    image: FALLBACK_IMAGE,
    price: '35',
    duration: 20,
    gender: 'female',
    area: 'mid',
    order: 5,
  },
  {
    id: 'chest-wax',
    name: 'Chest Wax',
    description: 'Full chest waxing for a clean, hair-free finish.',
    image: FALLBACK_IMAGE,
    price: '55',
    duration: 30,
    gender: 'female',
    area: 'mid',
    order: 6,
  },

  // ─── Female Lower Body ───────────────────────────────────────────────
  {
    id: 'brazilian-wax',
    name: 'Brazilian Wax',
    description: "Sugar Land's signature Brazilian — gentle hard wax, expert technique.",
    image: FALLBACK_IMAGE,
    price: '65',
    duration: 30,
    gender: 'female',
    area: 'low',
    order: 1,
  },
  {
    id: 'bikini-wax',
    name: 'Bikini Wax',
    description: 'Classic bikini line tidy-up for swimwear-ready confidence.',
    image: FALLBACK_IMAGE,
    price: '45',
    duration: 20,
    gender: 'female',
    area: 'low',
    order: 2,
  },
  {
    id: 'half-leg-wax',
    name: 'Half Leg Wax',
    description: 'Upper or lower leg waxing for smooth, touchable skin.',
    image: FALLBACK_IMAGE,
    price: '55',
    duration: 30,
    gender: 'female',
    area: 'low',
    order: 3,
  },
  {
    id: 'full-leg-wax',
    name: 'Full Leg Wax',
    description: 'Complete leg waxing from thigh to ankle for head-to-toe smoothness.',
    image: FALLBACK_IMAGE,
    price: '85',
    duration: 45,
    gender: 'female',
    area: 'low',
    order: 4,
  },
  {
    id: 'butt-wax',
    name: 'Butt Wax',
    description: 'Quick butt wax for a clean, even finish.',
    image: FALLBACK_IMAGE,
    price: '35',
    duration: 20,
    gender: 'female',
    area: 'low',
    order: 5,
  },

  // ─── Male Face ───────────────────────────────────────────────────────
  {
    id: 'mens-brow-wax',
    name: "Men's Brow Wax",
    description: 'Tidy brow shape-up for a clean, masculine look.',
    image: FALLBACK_IMAGE,
    price: '25',
    duration: 15,
    gender: 'male',
    area: 'face',
    order: 1,
  },
  {
    id: 'mens-nose-wax',
    name: "Men's Nose Wax",
    description: 'Quick, gentle nose hair wax for a polished appearance.',
    image: FALLBACK_IMAGE,
    price: '15',
    duration: 10,
    gender: 'male',
    area: 'face',
    order: 2,
  },
  {
    id: 'mens-ear-wax',
    name: "Men's Ear Wax",
    description: 'Targeted ear waxing for a clean, professional look.',
    image: FALLBACK_IMAGE,
    price: '15',
    duration: 10,
    gender: 'male',
    area: 'face',
    order: 3,
  },

  // ─── Male Mid Body ───────────────────────────────────────────────────
  {
    id: 'mens-chest-wax',
    name: "Men's Chest Wax",
    description: 'Full chest waxing with hard wax for smoother, longer-lasting results.',
    image: FALLBACK_IMAGE,
    price: '75',
    duration: 45,
    gender: 'male',
    area: 'mid',
    order: 1,
  },
  {
    id: 'mens-back-wax',
    name: "Men's Back Wax",
    description: 'Complete back waxing — a client favorite for summer.',
    image: FALLBACK_IMAGE,
    price: '85',
    duration: 45,
    gender: 'male',
    area: 'mid',
    order: 2,
  },
  {
    id: 'mens-stomach-wax',
    name: "Men's Stomach Wax",
    description: 'Stomach waxing for a defined, hair-free midsection.',
    image: FALLBACK_IMAGE,
    price: '45',
    duration: 25,
    gender: 'male',
    area: 'mid',
    order: 3,
  },
  {
    id: 'mens-underarm-wax',
    name: "Men's Underarm Wax",
    description: "Underarm waxing for a clean, all-day-fresh feel.",
    image: FALLBACK_IMAGE,
    price: '30',
    duration: 15,
    gender: 'male',
    area: 'mid',
    order: 4,
  },

  // ─── Male Lower Body ─────────────────────────────────────────────────
  {
    id: 'mens-full-leg-wax',
    name: "Men's Full Leg Wax",
    description: 'Full leg waxing for athletes and anyone who wants smooth legs.',
    image: FALLBACK_IMAGE,
    price: '95',
    duration: 60,
    gender: 'male',
    area: 'low',
    order: 1,
  },
  {
    id: 'mens-half-leg-wax',
    name: "Men's Half Leg Wax",
    description: 'Lower or upper leg waxing tailored to your needs.',
    image: FALLBACK_IMAGE,
    price: '65',
    duration: 35,
    gender: 'male',
    area: 'low',
    order: 2,
  },
];

/**
 * Returns services matching the given gender and area, ordered by `order` field.
 */
export function getServicesByGenderAndArea(
  gender: Gender,
  area: Area
): ServiceCatalogEntry[] {
  return SERVICES_CATALOG
    .filter((s) => s.gender === gender && s.area === area)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/**
 * Returns a small set of popular services for the homepage featured section.
 * Replace with curated IDs once the salon owner confirms the lineup.
 */
export function getPopularServices(): ServiceCatalogEntry[] {
  const popularIds = ['brazilian-wax', 'full-leg-wax', 'brow-wax'];
  return popularIds
    .map((id) => SERVICES_CATALOG.find((s) => s.id === id))
    .filter((s): s is ServiceCatalogEntry => s !== undefined);
}
