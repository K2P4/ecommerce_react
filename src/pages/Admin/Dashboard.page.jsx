import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardOverview } from "../../Components";
import { useLazyGetOverviewQuery } from "../../store/services/endpoints/dashboard.endpoint";
import { Card, CardContent } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const DashboardPage = () => {
  const [trigger, { data, isLoading, isError }] = useLazyGetOverviewQuery();
  const [hasFetched, setHasFetched] = useState(false);

  const nav = useNavigate();
  console.log('data',data)

  useEffect(() => {
    if (!hasFetched) {
      trigger();
      setHasFetched(true);
    }
  }, [trigger, hasFetched]);

  const chartData  = data
    ? [
        { name: "Customers", value: data.totalCustomers },
        { name: "Products", value: data.totalProducts },
        { name: "Transactions", value: data.totalTransactions },
        { name: "In Stock", value: data.inStockCounts },
        { name: "Out of Stock", value: data.outStockCounts },
        { name: "Sales ₹", value: data.totalAmount },
      ]
    : [];

  return (
    <div className="   ">
      <div className=" bg-gradient-to-br  min-h-screen">
        {/* Header */}
        <Link
          className=" text-xl font-semibold  text-left text-blue-400  border-b-blue-400 border-b"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>

        {/* Overview */}
        <DashboardOverview overviewData={data} />

        {/* Divider */}
        <hr className="my-8 border-blue-100" />

        {/* Sales Analytics Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <BarChartIcon className="text-green-400" />
            Sales Analytics
          </h2>

          <Card className="shadow rounded-lg">
            <CardContent>
              <p className="text-gray-700 mb-4">
                Total Sales This Month:{" "}
                <span className="font-bold ">
                  MMK {data?.currentMonthAmount?.toLocaleString() || 0}
                </span>
              </p>

              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5" // Tailwind indigo-600
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Overview Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Inventory Overview
          </h2>
          <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-gray-600">Products in Stock</div>
              <div className="text-2xl font-bold text-green-600">
                {data?.inStockCounts}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Out Of Stock Alerts</div>
              <div className="text-2xl font-bold text-red-500">
                {data?.outStockCounts}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
