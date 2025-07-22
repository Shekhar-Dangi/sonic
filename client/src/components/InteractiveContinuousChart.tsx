import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function InteractiveContinuousChart() {
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: {
        date: string;
        volume: number;
        weight: number;
        sets: number;
      };
    }>;
    label?: string;
  }

  const benchPressData = [
    {
      date: "Jan 15",
      volume: 8400, // 140lbs × 10 reps × 6 sets
      weight: 140,
      sets: 6,
    },
    {
      date: "Jan 17",
      volume: 9000, // 150lbs × 10 reps × 6 sets
      weight: 150,
      sets: 6,
    },
    {
      date: "Jan 19",
      volume: 8800, // 145lbs × 8 reps × 7.6 sets (rounded)
      weight: 145,
      sets: 8,
    },
    {
      date: "Jan 22",
      volume: 9600, // 160lbs × 8 reps × 7.5 sets
      weight: 160,
      sets: 8,
    },
    {
      date: "Jan 24",
      volume: 10200, // 170lbs × 6 reps × 10 sets
      weight: 170,
      sets: 10,
    },
    {
      date: "Jan 26",
      volume: 9900, // 165lbs × 6 reps × 10 sets
      weight: 165,
      sets: 10,
    },
    {
      date: "Jan 29",
      volume: 11400, // 190lbs × 6 reps × 10 sets
      weight: 190,
      sets: 10,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-black-200 rounded-lg shadow-lg">
          <p className="font-semibold text-black-900">{`Date: ${label}`}</p>
          <p className="text-primary-600">{`Volume: ${data.volume.toLocaleString()} lbs`}</p>
          <p className="text-black-700">{`Weight: ${data.weight} lbs`}</p>
          <p className="text-black-700">{`Sets: ${data.sets}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-90 mt-16 card py-8 px-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={benchPressData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Volume (lbs)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#7f5af0"
            strokeWidth={3}
            dot={{ fill: "#7f5af0", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: "#7f5af0", strokeWidth: 2 }}
            name="Bench Press Volume"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InteractiveContinuousChart;
