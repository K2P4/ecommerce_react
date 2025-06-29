import React, { useContext, useRef, useState } from "react";
import { useCreateStockMutation } from "../../store/services/endpoints/stock.endpoint";
import {
  DialogTitle,
  DialogContent,
  Grid,
  Select,
  InputLabel,
  CircularProgress,
  MenuItem,
  FormControl,
  Snackbar,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
} from "../../store/services/endpoints/category.endpoint";
import { AllContext } from "../../context/AllContext";

const CreateFormComponent = ({ handleClose, checkCategory = false }) => {
  const [uploadStock] = useCreateStockMutation();
  const [uploadCategory] = useCreateCategoryMutation();
  const { setSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const { data } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });
  const imageRef = useRef();

  const genderList = ["Men", "Women", "Unisex"];

  const [formData, setFormData] = useState({
    code: "",
    brand: "",
    size: "",
    gender: "Unisex",
    name: "",
    price: "",
    discountPercentage: "",
    inStock: "",
    reorderLevel: "",
    categoryId: "",
    description: "",
    images: [],
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name == "discountPercentage") {
      const numberValue = Number(value);

      if (numberValue > 99) {
        alert("Discount Percentage Must Be Shorter Than 99 %");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategory = (event) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: event.target.value,
    }));
  };

  const handleGenderChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      gender: event.target.value,
    }));
  };
  const handleImageChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  };

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const imageDisplay = () => {
    imageRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formDataApi = new FormData();

    if (checkCategory) {
      try {
        formDataApi.append("name", formData.name);
        formDataApi.append("image", formData.image);
        const response = await uploadCategory(formDataApi);
        if (response.data.success) {
          setSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to create stock.");
      }
    } else {
      formDataApi.append("code", formData.code);
      formDataApi.append("name", formData.name);
      formDataApi.append("price", formData.price);
      formDataApi.append("discountPercentage", formData.discountPercentage);
      formDataApi.append("inStock", Number(formData.inStock));
      formDataApi.append("reorderLevel", Number(formData.reorderLevel));
      formDataApi.append("size", Number(formData.size));
      formDataApi.append("description", formData.description);

      formData.images.forEach((image) => {
        formDataApi.append("images", image);
      });

      if (formData.categoryId) {
        formDataApi.append("categoryId", formData.categoryId);
      } else {
        formDataApi.append("categoryId", "");
      }

      try {
        const response = await uploadStock(formDataApi);
        console.log(response);
        if (response.data.success) {
          setSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to create stock.");
      }
    }

    setLoading(false);
    handleClose();
  };

  return (
    <div className="">
      <DialogTitle
        sx={{ fontFamily: "Poppins", textAlign: "center" }}
        id="responsive-dialog-title"
      >
        {checkCategory ? "Create New Category" : "Create New Stock"}
      </DialogTitle>
      <DialogContent>
        <form method="POST" onSubmit={handleSubmit}>
          {/* Name */}

          {checkCategory && (
            <Grid container spacing={5} className="">
              <Grid item xl={12} sm={12} md={12} lg={12}>
                <div className=" mb-3  ">
                  <p>Name</p>
                  <input
                    required
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              {/* Image */}

              <Grid item xl={12} sm={12} md={12} lg={12}>
                <p>Image</p>
                <div
                  onClick={imageDisplay}
                  className=" h-[200px] flex items-center border-dashed w-full border rounded-xl cursor-pointer "
                >
                  <p className="text-center m-auto h-auto">
                    {formData?.image != null && (
                      <ImageIcon fontSize="200" className="text-3xl" />
                    )}
                  </p>

                  <input
                    ref={imageRef}
                    className=" hidden "
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {!checkCategory && (
            <Grid container spacing={5} className="">
              {/* Form Section One */}
              <Grid item xl={7} sm={7} md={7} lg={7}>
                <div>
                  {/* <div className=" mb-3 ">
                    <p>Code</p>
                    <input
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* Name */}
                  <div className=" mb-3  ">
                    <p>Name</p>
                    <input
                      required
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className=" mb-3 ">
                    <p>Brand</p>
                    <input
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </div>

                  <div className=" mb-3 w-auto flex items-center gap-5 ">
                    {/* Price */}
                    <div>
                      <p>Price</p>
                      <div className="rounded-xl flex items-center border mt-1    w-56 ">
                        <p className="bg-gray-100 w-auto py-2 px-4 border-r rounded-l-xl ">
                          Ks
                        </p>
                        <input
                          required
                          className="focus:outline-none ps-2 "
                          type="text"
                          name="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Discount */}
                    <div className="  ">
                      <p>Discount Percentage</p>
                      <input
                        className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                        type="number"
                        name="discountPercentage"
                        placeholder="0"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </Grid>

              {/* Images */}

              <Grid item xl={4} sm={4} md={4} lg={4}>
                <div
                  onClick={imageDisplay}
                  className=" h-full border-dashed w-full border rounded-xl cursor-pointer "
                >
                  {formData?.images.length > 0 &&
                    formData?.images?.map((img) => (
                      <p className="text-sm line-clamp-1 mx-auto flex justify-center flex-col align-middle items-center mt-2 text-center text-gray-700">
                        {img.name}
                      </p>
                    ))}

                  <input
                    ref={imageRef}
                    className=" hidden "
                    required
                    multiple
                    type="file"
                    name="images"
                    onChange={handleImagesChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {!checkCategory && (
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "5px",
              }}
            >
              {/* Order Section  */}
              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Instock */}
                <div className=" mb-5 ">
                  <p>In Stock</p>
                  <input
                    required
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="text"
                    name="inStock"
                    placeholder="0"
                    value={formData.inStock}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Reorder Level */}
                <div className=" mb-5 ">
                  <p>Reorder Level</p>
                  <input
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="text"
                    name="reorderLevel"
                    placeholder="0"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Reorder Level */}
                <div className=" mb-5 ">
                  <p>Size ml</p>
                  <input
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="text"
                    name="size"
                    placeholder=""
                    value={formData.size}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {/* Category */}
          {!checkCategory && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className=" scroll-auto " fullWidth>
                  <label id="category-label">Category</label>
                  <Select
                    className=" scroll-auto "
                    sx={{ borderRadius: "15px" }}
                    labelId="category-label"
                    id="category-select"
                    value={formData.categoryId}
                    onChange={handleCategory}
                  >
                    {data?.data?.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl className=" scroll-auto " fullWidth>
                  <label id="gender-label">Gender</label>
                  <Select
                    className=" scroll-auto "
                    sx={{ borderRadius: "15px" }}
                    labelId="gender-label"
                    id="gender-select"
                    value={formData.gender}
                    onChange={handleGenderChange}
                  >
                    {genderList?.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {/* Desccription */}
          <div className=" mb-5 mt-5">
            <p>Description</p>
            <textarea
              className="border p-2 mt-1 focus:outline-none w-full rounded-xl  h-28 "
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit GP */}
          <div
            className={`flex items-center justify-center gap-20  ${
              checkCategory && "mt-10"
            } `}
          >
            <button
              onClick={handleClose}
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
    </div>
  );
};

export default CreateFormComponent;
