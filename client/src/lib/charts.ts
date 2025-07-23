import type { Metric } from "../stores/types";
import type { ChartDataPoint } from "../components/InteractiveContinuousChart";

// Generic time filtering function
export const filterByTimeRange = <T extends { date: string | Date }>(
  data: T[],
  timeRange: "week" | "month" | "year" | "custom",
  customRange?: { start: Date; end: Date }
): T[] => {
  const now = new Date();
  let startDate: Date;

  switch (timeRange) {
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "custom":
      if (!customRange)
        throw new Error("Custom range required for custom timeRange");
      startDate = customRange.start;
      break;
    default:
      throw new Error("Invalid time range");
  }

  const endDate = timeRange === "custom" && customRange ? customRange.end : now;

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

// Transform metrics data for charting (weight vs date, bodyFat vs date, etc.)
export const transformMetricsForChart = (
  metrics: Metric[],
  xParam: keyof Metric,
  yParam: keyof Metric,
  timeRange: "week" | "month" | "year" | "custom",
  customRange?: { start: Date; end: Date }
): ChartDataPoint[] => {
  // Filter by time range
  const filteredMetrics = filterByTimeRange(metrics, timeRange, customRange);

  // Filter out entries where either parameter is null/undefined
  const validMetrics = filteredMetrics.filter(
    (metric) =>
      metric[xParam] !== null &&
      metric[xParam] !== undefined &&
      metric[yParam] !== null &&
      metric[yParam] !== undefined
  );

  // Transform to chart format
  return validMetrics
    .map((metric) => {
      const chartPoint: ChartDataPoint = {};

      // Handle date fields specially
      if (xParam === "date") {
        chartPoint[xParam] = new Date(
          metric[xParam] as string | Date
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else {
        chartPoint[xParam] = metric[xParam] as string | number;
      }

      chartPoint[yParam] = metric[yParam] as string | number;

      // Add all other fields for tooltip
      Object.keys(metric).forEach((key) => {
        if (key !== xParam && key !== yParam) {
          chartPoint[key] = metric[key as keyof Metric] as string | number;
        }
      });

      chartPoint.sortDate = new Date(metric.date).getTime();
      return chartPoint;
    })
    .sort((a, b) => (a.sortDate as number) - (b.sortDate as number))
    .map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sortDate, ...rest } = item;
      return rest;
    });
};
