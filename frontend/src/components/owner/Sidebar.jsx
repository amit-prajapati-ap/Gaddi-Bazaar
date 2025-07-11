import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import profileImage from "../../assets/profile.png";
import { useAppContext } from "../../store/AppContext";

const Sidebar = () => {
  const {user, axios, toast, fetchUser} = useAppContext()
  const location = useLocation();
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false)

  const updateImage = async () => {
    try {
      setSaving(true)
      const formData = new FormData();
      formData.append("image", image);
      const {data} = await axios.put('/api/owner/update-image', formData)

      if (data.success) {
        toast.success(data.message)
        setImage("")
        fetchUser()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setSaving(false)
    }
  };

  return (
    <div className="relative min-h-screen md:flex items-center flex-col pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
        <img
          src={image ? URL.createObjectURL(image) : user?.image || profileImage}
          alt=""
          className="h-9 md:h-14 w-9 max-md:mb-2 md:w-14 rounded-full mx-auto"
        />
        <input
          type="file"
          id="image"
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={saving}
        />

        <div className="absolute hidden top-0 left-0 right-0 bottom-0 border-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
          <img src={assets.edit_icon} alt="" />
        </div>
      </label>
      </div>

      {image && (
        <button onClick={updateImage} className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer" disabled={saving}>{saving ? "Saving..." : "Save"} <img src={assets.check_icon} width={13} alt="" /></button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
            <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first-letter:mt-6 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}>
                <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" />
                <span className="max-md:hidden">{link.name}</span>
                <div className={`${link.path === location.pathname && "bg-primary"} w-1.5 h-8 rounded right-0 absolute`}></div>
            </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
