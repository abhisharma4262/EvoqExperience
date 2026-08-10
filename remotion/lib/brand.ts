import { brand } from "../../content/brand";

export const colors = brand.colors;

export const remotionBrand = {
  name: brand.name,
  tagline: brand.tagline,
  colors,
} as const;
