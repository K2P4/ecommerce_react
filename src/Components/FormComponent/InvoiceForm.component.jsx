import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
  TextField,
  FormControl,
} from "@mui/material";

const InvoiceFormComponent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ note: null });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        sx={{ fontFamily: "Poppins" }}
        startIcon={<AddIcon />}
        size="small"
      >
        Add Note
      </Button>

      {/* invoice note form */}
      <Dialog
        className="rounded-xl mx-auto  bg-transparent  shadow-sm"
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": { minHeight: "250px", maxHeight: "100vh" },
        }}
      >
 
        <DialogContent>
          <form method="PUT" onSubmit={handleSubmit}>
            {/* Order Status */}
            <FormControl className="" fullWidth>
              <label id="status-label">Note</label>
              <TextField multiline rows={4} variant="outlined" />
            </FormControl>

            {/* Submit GP */}
            <div className="flex items-center justify-center mt-10 gap-20">
              <button
                onClick={() => setOpen(false)}
                className="bg-blue-500 font-medium px-4 py-2 text-gray-50 hover:bg-blue-400 duration-500 transition-all rounded-full w-38"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-500 font-medium px-4 py-2 text-gray-50 hover:bg-blue-400 duration-500 transition-all rounded-full w-38"
              >
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size="23px"
                    className="mx-auto"
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceFormComponent;
