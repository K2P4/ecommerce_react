import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useOrderDetailQuery } from "../../store/services/endpoints/order.endpoint";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Divider,
  Grid,
  CircularProgress,
  IconButton,
  Stack,
  Typography, TextField, Paper, List, ListItem, ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ArchiveIcon from "@mui/icons-material/Archive";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
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
  // const deliveryFee = data?.order?.deliveryType == 0 ? 3000 : 5000;

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
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" /> Order{" "}
        {data?.order?.invoiceNumber}
      </div>

      <div className="bg-white rounded-md shadow-md overflow-hidden">
        {/* Top Bar */}
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

        {/* Action Buttons */}
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
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="h6"
            className=" font-medium "
          >
            Summary
          </Typography>
          <hr className="my-4" />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Invoice ID
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Typography sx={{ fontFamily: "Poppins" }}>
                INV-{data?.order?.invoiceNumber}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                className="text-blue-500"
              >
                <a target="_blank" href={`mailto:${data?.order?.email}`}>
                  {data?.order?.email}
                </a>
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Currency
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Typography sx={{ fontFamily: "Poppins" }}>MMK</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {data?.order?.name}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Start Date
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {moment(data?.order?.createdAt).format("D.M.Y")}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Billing Details
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={7}>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {data?.order?.payDate
                  ? moment(data?.order?.payDate).format("D.M.Y")
                  : "Pending"}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Note
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={3}>
              <Typography sx={{ fontFamily: "Poppins" }}>None</Typography>
            </Grid>


            <Grid item xs={6} sm={3} md={1}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                variant="subtitle2"
                color="textSecondary"
              >
                Status
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={7}>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {data?.order?.invoiceId?.status}
              </Typography>
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
              <Typography sx={{ fontFamily: "Poppins" }} variant="subtitle1">
                Sub Total
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {calculateSubTotal?.toLocaleString()} MMK
              </Typography>
            </div>

            <div className="flex justify-between w-64 ">
              <Typography sx={{ fontFamily: "Poppins", color: 'gray' }} variant="subtitle1">
                Discount
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {total_discount_amount?.toLocaleString()} MMK
              </Typography>
            </div>

            <div className="flex justify-between w-64">
              <Typography sx={{ fontFamily: "Poppins", color: 'gray' }} variant="subtitle1">
                Tax
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {taxAmount.toLocaleString()} MMK
              </Typography>
            </div>
            <Divider className=" w-72 " />
            <div className="flex justify-between w-64 mt-2 ">
              <Typography sx={{ fontFamily: "Poppins" }} variant="subtitle1">
                Total Amount
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                  fontSize: "medium",
                }}
              >
                {data?.order?.totalAmount?.toLocaleString()} MMK
              </Typography>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row gap-6 p-4 border-t w-full border-gray-200">
          {/* Log Activity */}
          <div className="flex-1">
            <div className="">
              <h1
                variant="h1" className="mb-3 font-medium text-xl text-gray-800">
                Logs
              </h1>
              {data?.order?.invoiceId?.logs?.map((log, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="mr-2 cursor-pointer bg-blue-400 hover:bg-blue-300 duration-700 transition-all
                     rounded-full p-1">{log.icon}</div>
                  <div>
                    <p>{log.message}</p>
                    <p variant="caption" className="text-gray-500 text-sm m-0">
                      {moment(log.date).format("DD.MMMM.YYYY , hh:mmA")}
                    </p>
                  </div>
                </div>
              ))}


            </div>

          </div>

          {/* Attachments */}
          <div className="flex-1">
            <h1 variant="h6" className="mb-3">
              Attachments
            </h1>


            {data?.order?.invoiceId?.logs?.map((attachment, index) => (
              <div key={index} className="flex items-center mb-2">
                <InsertDriveFileIcon className="mr-2" color="action" />
                <div>
                  <Typography>{attachment.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {attachment.size}
                  </Typography>
                </div>
              </div>
            ))}


          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceDetailPage;
