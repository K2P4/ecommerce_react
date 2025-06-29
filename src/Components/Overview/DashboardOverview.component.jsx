import React from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

const DashboardOverview = ({ overviewData }) => {
  const stats = [
    {
      title: "Total Customers",
      value: overviewData?.totalCustomers,
      icon: <Users className="w-9 h-9 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Transactions",
      value: overviewData?.totalTransactions,
      icon: <ShoppingCart className="w-9 h-9 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Products",
      value: overviewData?.totalProducts,
      icon: <Package className="w-9 h-9 text-yellow-600" />,
      bg: "bg-yellow-50",
    },
    {
      title: "Total Amount",
      value: `${Number(overviewData?.totalAmount).toLocaleString()} MMK`,
      icon: <DollarSign className="w-9 h-9 text-red-600" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="pt-7 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-md shadow-sm p-6 ${stat.bg} flex items-center justify-between`}
          >
            <div>
              <div className="text-sm text-gray-600 ">{stat.title}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
