"use client";
import React, { useMemo } from 'react';
import DashboardBox from './DashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '../../../state/api';
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ZAxis,
  Scatter,
  ScatterChart,
} from "recharts";
import { Box, Typography, useTheme } from '@mui/material';
import BoxHeader from './BoxHeader';
import FlexBetween from './FlexBetween';

type Props = {};

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery()as { data: 
    { kpiData: 
      { monthlyData: 
        { month: string; 
          revenue: string; 
          expenses: string; 
          operationalExpenses : string;
          nonOperationalExpenses : string;
        }[]; 
          dailyData: 
          { date: string; 
            revenue: string; 
            expenses: string; }[] }[] } };

  const { data: rawProductData} = useGetProductsQuery() as {data:
    { productData:string;
      
    }
  }
  const pieColors = [palette.primary[800], palette.primary[300]];






  // Ensure hooks are called unconditionally
  const operationalExpenses = useMemo(() => {
    // Check if operationalData and its properties exist before accessing them
    if (operationalData && operationalData.kpiData && operationalData.kpiData[0]?.monthlyData) {
      const mappedData = operationalData.kpiData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": parseFloat(operationalExpenses.replace(/[$,]/g, '')),
          "Non Operational Expenses": parseFloat(nonOperationalExpenses.replace(/[$,]/g, '')),
        };
      });
    //  console.log("Mapped operationalExpenses:", mappedData); // Log mapped data
      return mappedData;
    } else {
      return [];
    }
  }, [operationalData]); // Ensure operationalData is listed as a dependency

  const productExpenseData = useMemo(() => {
    if (rawProductData && Array.isArray(rawProductData.productData)) {
      const mappedData = rawProductData.productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: parseFloat(price.replace(/[$,]/g, '')),
          expense: parseFloat(expense.replace(/[$,]/g, '')),
        };
      });
      //console.log("Mapped productExpenseData:", mappedData); // Log mapped data
      return mappedData;
    } else {
      return [];
    }
  }, [rawProductData]);


  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          subtitle="Top line represents operational expenses, bottom line represents non-operational expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }} />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e" >
      <BoxHeader title="Campaigns and Targets" subtitle="Current campaign performance" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      
      <DashboardBox gridArea="f">
      <BoxHeader title="Product Prices vs Expenses" subtitle="Analysis of product pricing" sideText="+4%" />
        <ResponsiveContainer width="100%" height="80%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;