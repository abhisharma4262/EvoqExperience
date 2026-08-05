/**
 * Lightweight WCAG AA contrast check for EVOQ brand pairs.
 * Run: npm run check:contrast
 */

const pairs = [
  { name: "primary on linen", fg: "#0C2226", bg: "#F6F3F0" },
  { name: "secondary on linen", fg: "#194247", bg: "#F6F3F0" },
  { name: "muted on linen", fg: "#556670", bg: "#F6F3F0" },
  // Accent teal is fill-only on light; body/link text uses accent-alt.
  { name: "accent-alt on linen", fg: "#337077", bg: "#F6F3F0" },
  { name: "on-dark on carbon", fg: "#F6F3F0", bg: "#0C2226" },
  { name: "accent-on-dark on carbon", fg: "#52E081", bg: "#0C2226" },
  { name: "highlight-on-dark on carbon", fg: "#E5FD84", bg: "#0C2226" },
  // Primary CTA: Carbon Moss text on Virtual Tide fill
  { name: "primary text on accent fill", fg: "#0C2226", bg: "#09A78D" },
  { name: "white on accent-alt fill", fg: "#FFFFFF", bg: "#337077" },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function channel(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

let failed = 0;
for (const pair of pairs) {
  const ratio = contrast(pair.fg, pair.bg);
  const pass = ratio >= 4.5;
  const mark = pass ? "PASS" : "FAIL";
  console.log(`${mark}  ${pair.name}: ${ratio.toFixed(2)}:1`);
  if (!pass) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} contrast pair(s) failed WCAG AA (4.5:1).`);
  process.exit(1);
}

console.log("\nAll checked pairs pass WCAG AA.");
