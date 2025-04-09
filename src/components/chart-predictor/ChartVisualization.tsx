
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

interface ChartVisualizationProps {
  chartData: any[];
  isCalculated: boolean;
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({
  chartData,
  isCalculated,
}) => {
  if (!isCalculated || chartData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-muted-foreground">
        <p>Calculate metrics to visualize chart data</p>
      </div>
    );
  }

  // Find min and max price for better axis scaling
  const minPrice = Math.min(...chartData.map((item) => item.price));
  const maxPrice = Math.max(...chartData.map((item) => item.price));
  const priceRange = maxPrice - minPrice;
  
  // Add padding to the Y axis
  const yAxisDomain = [
    Math.max(0, minPrice - priceRange * 0.1),
    maxPrice + priceRange * 0.1,
  ];

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full">
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "#20c997" // Using the teal color directly for better visibility
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#614e1a" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#FFF8E1" }}
                tickLine={{ stroke: "#FFF8E1" }}
                axisLine={{ stroke: "#614e1a" }}
              />
              <YAxis
                domain={yAxisDomain}
                tick={{ fontSize: 12, fill: "#FFF8E1" }}
                tickLine={{ stroke: "#FFF8E1" }}
                axisLine={{ stroke: "#614e1a" }}
                tickFormatter={(value) => `$${value.toFixed(4)}`}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#20c997"
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="95%"
                    stopColor="#20c997"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="price"
                stroke="#20c997"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="h-[150px] w-full">
        <ChartContainer
          config={{
            volume: {
              label: "Volume",
              color: "#D4AF37" // Using gold color for volume
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#614e1a" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#FFF8E1" }}
                tickLine={{ stroke: "#FFF8E1" }}
                axisLine={{ stroke: "#614e1a" }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#FFF8E1" }}
                tickLine={{ stroke: "#FFF8E1" }}
                axisLine={{ stroke: "#614e1a" }}
                tickFormatter={(value) => 
                  value >= 1000000
                    ? `$${(value / 1000000).toFixed(1)}M`
                    : `$${(value / 1000).toFixed(0)}K`
                }
              />
              <ChartTooltip content={<CustomVolumeTooltip />} />
              <Bar dataKey="volume" fill="#D4AF37" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 border shadow-md bg-background text-foreground">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-apearmor-teal font-medium">
          Price: ${payload[0].value.toFixed(6)}
        </p>
      </Card>
    );
  }
  return null;
};

const CustomVolumeTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 border shadow-md bg-background text-foreground">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-apearmor-gold font-medium">
          Volume: ${payload[0].value.toLocaleString()}
        </p>
      </Card>
    );
  }
  return null;
};

export default ChartVisualization;
