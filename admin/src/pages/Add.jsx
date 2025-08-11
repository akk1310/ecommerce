import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Store as JSON string

      // Append images if they exist
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      // Example fetch call to backend
      // const res = await fetch("/api/products", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await res.json();

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice();
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }else{
      toast.error(response.data.message);

      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2"> Upload Image </p>
        <div className="flex gap-2">
          <label className="cursor-pointer" htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_image"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label className="cursor-pointer" htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_image"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label className="cursor-pointer" htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_image"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label className="cursor-pointer" htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_image"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>{" "}
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="249"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-3 py-1 cursor-pointer ${
                  sizes.includes(size) ? "bg-pink-100 " : "bg-slate-200"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        className="w-28 cursor-pointer py-3 mt-4 bg-black text-white flex justify-center items-center"
        type="submit"
        disabled={loading} // disable while loading
      >
        {loading ? (
          <span className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin"></span>
        ) : (
          "ADD"
        )}
      </button>
    </form>
  );
};

export default Add;
