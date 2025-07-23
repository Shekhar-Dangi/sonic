import { useGenericChart, type UseGenericChartParams } from "./useGenericChart";
import type {
  ChartDataPoint,
  ChartConfig,
} from "../components/InteractiveContinuousChart";
import type { Metric } from "../stores/types";

interface useMetricChartReturn {
  data: ChartDataPoint[];
  config: ChartConfig;
  hasData: boolean;
}

export const useMetricChart = (
  yParam: keyof Metric,
  timeRange: UseGenericChartParams["timeRange"]
): useMetricChartReturn => {
  return useGenericChart({
    dataSource: "metrics",
    xParam: "date",
    yParam: yParam,
    timeRange: timeRange,
    chartTitle: "Weight Progress (This Month)",
    yAxisLabel: "Weight (lbs)",
    lineColor: "#7f5af0",
    lineName: "Weight",
  });
};
