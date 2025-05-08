'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Sample data for the chart
const data = [
  {
    name: 'Jan',
    total: 1200,
  },
  {
    name: 'Feb',
    total: 1900,
  },
  {
    name: 'Mar',
    total: 1500,
  },
  {
    name: 'Apr',
    total: 2200,
  },
  {
    name: 'May',
    total: 2800,
  },
  {
    name: 'Jun',
    total: 2600,
  },
  {
    name: 'Jul',
    total: 3100,
  },
  {
    name: 'Aug',
    total: 2900,
  },
  {
    name: 'Sep',
    total: 3300,
  },
  {
    name: 'Oct',
    total: 3580,
  },
  {
    name: 'Nov',
    total: 3900,
  },
  {
    name: 'Dec',
    total: 4100,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value}`, 'Revenue']}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}