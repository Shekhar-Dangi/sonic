import { useMemo } from "react";
import { useUserStore } from "../stores/userStore";
import { transformMetricsForChart } from "../lib/charts";
import type {
  ChartDataPoint,
  ChartConfig,
} from "../components/InteractiveContinuousChart";
import type { Metric } from "../stores/types";

export interface UseGenericChartParams {
  dataSource: "metrics" | "logs";
  xParam: keyof Metric;
  yParam: keyof Metric;
  timeRange: "week" | "month" | "year" | "custom";
  customRange?: { start: Date; end: Date };
  chartTitle: string;
  yAxisLabel: string;
  lineColor?: string;
  lineName: string;
  yAxisDomain?: [string | number, string | number]; // Custom Y-axis range
}

interface UseGenericChartReturn {
  data: ChartDataPoint[];
  config: ChartConfig;
  hasData: boolean;
}

export const useGenericChart = (
  params: UseGenericChartParams
): UseGenericChartReturn => {
  const { metrics } = useUserStore();

  const chartData = useMemo(() => {
    if (params.dataSource === "metrics") {
      return transformMetricsForChart(
        metrics,
        params.xParam,
        params.yParam,
        params.timeRange,
        params.customRange
      );
    }

    // logs transformation remaining

    return [];
  }, [metrics, params]);

  const config: ChartConfig = useMemo(
    () => ({
      title: params.chartTitle,
      xAxisKey: params.xParam as string,
      yAxisKey: params.yParam as string,
      yAxisLabel: params.yAxisLabel,
      lineColor: params.lineColor || "#7f5af0",
      lineName: params.lineName,
      yAxisDomain: params.yAxisDomain,
    }),
    [params]
  );

  return {
    data: chartData,
    config,
    hasData: chartData.length > 0,
  };
};
