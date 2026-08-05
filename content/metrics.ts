export type Metric = {
  id: string;
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  context: string;
};

export const metrics: Metric[] = [
  {
    id: "transformation",
    label: "Accelerated transformation for services",
    value: "10×",
    numericValue: 10,
    suffix: "×",
    context: "hero",
  },
  {
    id: "roi",
    label: "ROI assurance for operations",
    value: "5×",
    numericValue: 5,
    suffix: "×",
    context: "hero",
  },
  {
    id: "mvp",
    label: "Concept-to-MVP compressed from months to days",
    value: "Days",
    context: "create",
  },
  {
    id: "salesforce",
    label: "Salesforce implementation assessment",
    value: "2 months → 8 hours",
    context: "transform",
  },
  {
    id: "discovery",
    label: "Acceleration in business discovery",
    value: "50%",
    numericValue: 50,
    suffix: "%",
    context: "create",
  },
  {
    id: "ttm",
    label: "Acceleration in time-to-market for new products",
    value: "40%",
    numericValue: 40,
    suffix: "%",
    context: "create",
  },
];

export function getMetric(id: string): Metric {
  const metric = metrics.find((m) => m.id === id);
  if (!metric) {
    throw new Error(`Unknown metric: ${id}`);
  }
  return metric;
}
