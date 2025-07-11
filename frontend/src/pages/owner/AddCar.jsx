import React, { useState } from "react";
import { Title } from "../../components/owner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../store/AppContext";

const AddCar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const { axios, toast, currency } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(toast.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title={"Add New Car"}
        subTitle={
          "Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        }
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image  */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="cursor-pointer h-14 rounded"
              alt=""
            />
          </label>
          <input
            type="file"
            name="car-image"
            id="car-image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              required
              placeholder="e.g. BMW, Mercedes, Audi..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              required
              placeholder="e.g. X5, E-Class, M4..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              required
              placeholder="2025"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year > 0 ? car.year : ""}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>daily Price ({currency})</label>
            <input
              type="number"
              required
              placeholder="100"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay > 0 ? car.pricePerDay : ""}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Car Transmissionm, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Auto</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              required
              placeholder="4"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity > 0 ? car.seating_capacity : ""}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location  */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <label>Location</label>
            <select
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              value={car.location}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangluru">Bangluru</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Chennai">Chennai</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>
        </div>

        {/* Car Description  */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows="5"
            required
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine"
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button
          className={`flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-md mt-4 font-medium w-max ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          disabled={isLoading}
        >
          <img src={assets.tick_icon} alt="" />
          <span>{isLoading ? "Adding..." : "Add Car"}</span>
        </button>
      </form>
    </div>
  );
};

export default AddCar;
