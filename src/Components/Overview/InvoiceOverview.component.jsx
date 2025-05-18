import React from "react";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

const InvoiceOverviewComponent = ({ ordersData, invoices }) => {

  const totalProducts = invoices?.reduce((acc, invoice) => {
    return invoice.items.length + acc;
  }, 0);




  const stats = [
    {
      title: "Total Customers",
      value: invoices?.length,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Transactions",
      value: ordersData?.totalTransactions,
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Package className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-50",
    },
    {
      title: "Total Amount",
      value: `${Number(ordersData?.allTotalAmount).toLocaleString()} MMK`,
      icon: <DollarSign className="w-6 h-6 text-red-600" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="pt-7 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-md shadow-sm p-4 ${stat.bg} flex items-center justify-between`}
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

export default InvoiceOverviewComponent;
