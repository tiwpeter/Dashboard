"use client";
import React, { useMemo } from 'react';
import DashboardBox from './DashboardBox';
import { useGetKpisQuery, useGetProductsQuery, useGetTransacTionQuery } from '../../../state/api';
import BoxHeader from './BoxHeader';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';
import { GridRenderCellParams } from '@mui/x-data-grid'; // Import the correct type for renderCell params

type Props = {};

interface Transaction {
  _id: string;
  buyer: string;
  amount: string;
  productIds: string[];
}

interface Product {
  _id: string;
  name: string;
  expense: string;
  price: string;
  transactions: string[];
}

interface KpiData {
  totalExpenses: any;
  monthlyData: {
    month: string;
    revenue: string;
    expenses: string;
    operationalExpenses: string;
    nonOperationalExpenses: string;
    totalExpenses: string;
  }[];
  dailyData: {
    date: string;
    revenue: string;
    expenses: string;
  }[];
  expensesByCategory: string;
}

interface ApiResponse<T> {
  data: T;
}

const Row3 = (props: Props) => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: productdata } = useGetProductsQuery() as ApiResponse<{ productData: Product[] }>;
  const { data: transactionData } = useGetTransacTionQuery() as ApiResponse<{ transactionData: Transaction[] }>;
  const { data: kpiData } = useGetKpisQuery() as ApiResponse<{ kpiData: KpiData[] }>;

  console.log(kpiData);

  const productColumns = useMemo(() => [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.3,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.7,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'transactions',
      headerName: 'Transactions',
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const transactions = params.value as string[];
        return transactions.length > 5 ? transactions.slice(0, 5).join(", ") + "..." : transactions.join(", ");
      },
    },
  ], []);

  const transactionColumns = useMemo(() => [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => (params.value as string[]).length,
    },
  ], []);

  const pieChartData = useMemo(() => {
    if (kpiData && kpiData.kpiData && kpiData.kpiData.length > 0) {
      const totalExpenses = kpiData.kpiData[0].totalExpenses;
      return Object.entries(kpiData.kpiData[0].expensesByCategory).map(
        ([key, value]: [string, string]) => ({
          name: key,
          value: parseFloat(value.replace('$', '')),
        })
      );
    }
    return [];
  }, [kpiData]);

  const productRows = Array.isArray(productdata?.productData) ? productdata.productData : [];
  const transactionRows = Array.isArray(transactionData?.transactionData) ? transactionData.transactionData : [];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title='List of Products'
          subtitle='Details of available products'
          sideText={`${productRows.length} products`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            headerHeight={25} // Change columnHeaderHeight to headerHeight
            rowHeight={35}
            hideFooterPagination={true} // Change hideFooter to hideFooterPagination
            rows={productRows}
            columns={productColumns}
            getRowId={(row) => row._id}
          />
          
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title='Recent Orders'
          subtitle='Details of recent transactions'
          sideText={`${transactionRows.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            headerHeight={25} // Change columnHeaderHeight to headerHeight
            rowHeight={35}
            hideFooterPagination={true} // Change hideFooter to hideFooterPagination
            rows={transactionRows}
            columns={transactionColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Expense Breakdown By Category"
          subtitle="Current month's expense breakdown"
          sideText="+4%"
        />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data.name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={[data]}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell key={`cell-${i}`} fill={pieColors[i]} />
                </Pie>
              </PieChart>
              <Typography variant="h5">{data?.name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          subtitle=""
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
          <Typography margin="0 1rem" variant="h6">
            Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
            ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
            molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
            sed. In volutpat nullam at est id cum pulvinar nunc.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
