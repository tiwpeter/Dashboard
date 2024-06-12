"use client";

import DashboardBox from './DashboardBox';
import { useGetKpisQuery } from '../../../state/api';
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import BoxHeader from './BoxHeader';

type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery() as { data: 
    { kpiData: 
      { monthlyData: 
        { month: string; 
          revenue: string; 
          expenses: string; }[]; 
          dailyData: 
          { date: string; revenue: string; expenses: string; }[] }[] } };

  const revenue = useMemo(() => {
    if (kpiData && kpiData.kpiData && kpiData.kpiData[0]?.monthlyData) {
      return kpiData.kpiData[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: parseFloat(revenue.replace(/[^0-9.-]+/g, "")),
        };
      });
    }
    return [];
  }, [kpiData]);

  const revenueExpenses = useMemo(() => {
    if (kpiData && kpiData.kpiData && kpiData.kpiData[0]?.monthlyData) {
      return kpiData.kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: parseFloat(revenue.replace(/[^0-9.-]+/g, "")),
          expenses: parseFloat(expenses.replace(/[^0-9.-]+/g, "")),
        };
      });
    }
    return [];
  }, [kpiData]);

  const revenueProfit = useMemo(() => {
    if (kpiData && kpiData.kpiData && kpiData.kpiData[0]?.monthlyData) {
      return kpiData.kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
        const parsedRevenue = parseFloat(revenue.replace(/[^0-9.-]+/g, ""));
        const parsedExpenses = parseFloat(expenses.replace(/[^0-9.-]+/g, ""));
        return {
          name: month.substring(0, 3),
          revenue: parsedRevenue,
          profit: (parsedRevenue - parsedExpenses).toFixed(2),
        };
      });
    }
    return [];
  }, [kpiData]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
          width={500}
          height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[0, 'auto']} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line represents revenue, bottom line represents profit"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
