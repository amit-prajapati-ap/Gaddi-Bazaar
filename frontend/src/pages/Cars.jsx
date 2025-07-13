import React, { useEffect, useState } from "react";
import { CarCard, Loader, Title } from "../components";
import { assets } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../store/AppContext";
import { motion } from "motion/react";

const Cars = () => {
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickuplocation')
  const pickupDate = searchParams.get('pickupdate') 
  const returnDate = searchParams.get('returndate')
  const {cars, axios, toast} = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async() => {
    if (input === '') {
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase()) || car.model.toLowerCase().includes(input.toLowerCase()) || car.category.toLowerCase().includes(input.toLowerCase()) || car.transmission.toLowerCase().includes(input.toLowerCase()) || car.fuel_type.toLowerCase().includes(input.toLowerCase()) || car.location.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    try {
      const {data} = await axios.post(`/api/booking/check-availability`, {location: pickupLocation, pickupDate, returnDate})
      if (data.success) {
        setFilteredCars(data.data)
        if (data.data.length === 0) {
          toast.error("No cars available for selected dates and location")
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailability()
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])
  

  return (
    <div className="max-w-window mx-auto mb-20 min-h-[70vh]">
      <motion.div initial={{y: 30, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, ease: "easeOut"}} className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title={"Browse Cars"}
          subTitle={
            "Explore our selection of premium  vehicles available for your next adventure."
          }
        />

        <motion.div whileHover={{ scale: 1.05 }} transition={{duration: 0.3}} className="flex items-center bg-white px-4 mt-6 w-full h-12 rounded-full shadow max-w-140">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <img
            src={assets.filter_icon}
            alt=""
            className="w-4.5 h-4.5 mr-2 cursor-pointer"
          />
        </motion.div>
      </motion.div>
      {cars && cars.length > 0 ? (
        <motion.div initial={{opacity: 0}} whileInView={{ opacity: 1}} transition={{duration: 0.5, delay: 0.6}} className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10  max-w-7xl mx-auto">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20">
          {filteredCars.map((car, index) => (
            <motion.div initial={{opacity: 0, y: 20}} whileInView={{y: 0, opacity: 1}} transition={{delay: 0.3*index, duration: 0.4}} key={car._id}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      ) : <Loader/>}
    </div>
  );
};

export default Cars;
