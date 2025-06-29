import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useOrderDetailQuery } from "../../store/services/endpoints/order.endpoint";
import {
  Button,
  Divider,
  Grid,
  CircularProgress,
  Stack,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ArchiveIcon from "@mui/icons-material/Archive";
import moment from "moment";
import InvoiceFormComponent from "../../Components/FormComponent/InvoiceForm.component";
import { useSendInvoiceMutation } from "../../store/services/endpoints/invoice.endpoint";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const { data } = useOrderDetailQuery(id);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [sendInvoice, { isLoading }] = useSendInvoiceMutation();


  const calculateSubTotal = data?.order?.items?.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const total_discount_amount = data?.order?.items?.reduce((acc, item) => {
    const original_price = item.price / (1 - item.discount / 100);
    const discount_amount = original_price - item.price;
    return discount_amount * item.quantity
  }, 0);


  const taxAmount = calculateSubTotal > 200000 ? calculateSubTotal * 0.005 : 0;


  const handleSendInvoice = async () => {
    try {
      const res = await sendInvoice({ orderId: data?.order?._id }).unwrap();

      if (res.success) {
        setSuccess(true);
        setMessage("Invoice sent successfully");
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send invoice.");
    }
  };
  return (


    <div>
      {success && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md mt-4">
          {message}
        </p>
      )}

      {/* nav route */}
      <div className="text-xl  mb-10 font-semibold text-gray-800 ">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/admin/invoices"
        >
          Invoice Lists
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" /> Invoice{" "}
        {data?.order?.invoiceNumber}
      </div>

      <div className="bg-white rounded-md shadow-md overflow-hidden">
   
        <div className="px-4 py-3 flex items-center justify-between bg-gray-50 border-b border-gray-200">
          <div>
            <span className="font-medium text-xl mr-4">
              INV-{data?.order?.invoiceId?.invoiceNumber}
            </span>
            for
            <span className="ml-4 font-medium">
              {data?.order?.totalAmount?.toFixed(2)} MMK
            </span>
          </div>
          {data?.order?.invoiceId?.payDate != null ? (
            <span
              className={`px-3 py-1.5 hover:cursor-pointer rounded-md text-xs font-medium bg-green-100 text-green-700`}
              size="small"
            >
              Paid
            </span>
          ) : (
            <span
              className={`px-3 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700`}
              size="small"
            >
              UnPaid
            </span>
          )}
        </div>

        {/* Action  */}
        <div className="px-4 py-2 bg-blue-50">
          <Stack direction="row" spacing={1} alignItems="center">
            <InvoiceFormComponent />
            <Button
              sx={{ fontFamily: "Poppins" }}
              startIcon={<EditIcon />}
              size="small"
            >
              Edit Invoice
            </Button>
            <Button
              onClick={handleSendInvoice}
              sx={{ fontFamily: "Poppins" }}
              startIcon={isLoading ? <CircularProgress color="primary" size={20} thickness={5} /> : <SendIcon />}
              size="small"
            >
              Send Invoice
            </Button>
            <Button
              sx={{ fontFamily: "Poppins" }}
              startIcon={<ArchiveIcon />}
              size="small"
            >
              Hold Invoice
            </Button>
          </Stack>
        </div>

        {/* Summary */}
        <div className="p-4">
          <p
            sx={{ fontFamily: "Poppins" }}
            variant="h6"
            className=" font-medium "
          >
            Summary
          </p>
          <hr className="my-4" />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Invoice ID
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <p sx={{ fontFamily: "Poppins" }}>
                INV-{data?.order?.invoiceNumber}
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Email
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <p
                sx={{ fontFamily: "Poppins" }}
                className="text-blue-500"
              >
                <a target="_blank" href={`mailto:${data?.order?.email}`}>
                  {data?.order?.email}
                </a>
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Currency
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <p sx={{ fontFamily: "Poppins" }}>MMK</p>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Name
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <p sx={{ fontFamily: "Poppins" }}>
                {data?.order?.name}
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Start Date
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <p sx={{ fontFamily: "Poppins" }}>
                {moment(data?.order?.createdAt).format("D.M.Y")}
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Billing Details
              </p>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <p sx={{ fontFamily: "Poppins" }}>
                {data?.order?.payDate
                  ? moment(data?.order?.payDate).format("D.M.Y")
                  : "Pending"}
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Note
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={3}>
              <p sx={{ fontFamily: "Poppins" }}>None</p>
            </Grid>


            <Grid item xs={6} sm={3} md={1}>
              <p
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Status
              </p>
            </Grid>

            <Grid item xs={6} sm={3} md={7}>
              <p sx={{ fontFamily: "Poppins" }}>
                {data?.order?.invoiceId?.status}
              </p>
            </Grid>
          </Grid>

          {/* Items Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QTY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.order?.items?.map((item) => (
                  <tr
                    className="hover:bg-gray-100 transition-all duration-500 cursor-pointer "
                    key={item.id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 text-sm text-gray-900">
                      <img
                        className="h-12 w-12 rounded-sm object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.price?.toLocaleString()} MMK
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  font-medium text-right">
                      {item.price?.toLocaleString()} MMK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Calculations */}
          <div className="mt-2 flex flex-col space-y-2 items-end mr-5">
            <div className="flex justify-between w-64">
              <p sx={{ fontFamily: "Poppins" }} variant="subtitle1">
                Sub Total
              </p>
              <p
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {calculateSubTotal?.toLocaleString()} MMK
              </p>
            </div>

            <div className="flex justify-between w-64 ">
              <p sx={{ fontFamily: "Poppins", color: 'gray' }} variant="subtitle1">
                Discount
              </p>
              <p
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {total_discount_amount?.toLocaleString()} MMK
              </p>
            </div>

            <div className="flex justify-between w-64">
              <p sx={{ fontFamily: "Poppins", color: 'gray' }} variant="subtitle1">
                Tax
              </p>
              <p
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {taxAmount.toLocaleString()} MMK
              </p>
            </div>
            <Divider className=" w-72 " />
            <div className="flex justify-between w-64 mt-2 ">
              <p sx={{ fontFamily: "Poppins" }} variant="subtitle1">
                Total Amount
              </p>
              <p
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {data?.order?.totalAmount?.toLocaleString()} MMK
              </p>
            </div>
          </div>
        </div>

  

      </div>
    </div>
  );
};

export default InvoiceDetailPage;
