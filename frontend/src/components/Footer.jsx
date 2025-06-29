import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        {
            url: '/',
            name: 'Home'
        },
        {
            url: '/contact-us',
            name: 'Contact Us'
        },
        {
            url: '/about-us',
            name: 'About Us'
        },
        {
            url: '/cars',
            name: 'Cars'
        },
        {
            url: '/my-bookings',
            name: 'My Bookings'
        }
      ]
    },
    {
      title: "Follow Us",
      links: [
        {
            url: 'https://x.com/Prajapatiamitap',
            name: 'Twitter(X)'
        },
        {
            url: 'https://www.linkedin.com/in/amit-prajapati-0544882b5/',
            name: 'LinkedIn'
        },
        {
            url: 'https://github.com/amit-prajapati-ap',
            name: 'GitHub'
        },
        {
            url: 'https://portfolio-amit-prajapati.vercel.app/',
            name: 'Portfolio'
        }
      ]
    },
  ];
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1200px] mx-auto border-t border-gray-500/60">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img onClick={() => {navigate('/') ; scrollTo(0, 0)}}
            className="w-34 md:w-42 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />
          <p className="max-w-[410px] mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        <div className="flex flex-wrap sm:justify-around w-full sm:w-[45%] gap-20 sm:gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              {section.title === "Quick Links" ? <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li onClick={() => {navigate(link.url); scrollTo(0, 0)}} key={i} className="hover:underline transition-all duration-300 cursor-pointer hover:text-primary">
                    {link.name}
                  </li>
                ))}
              </ul> : <ul className="flex flex-col text-sm space-y-1">
                {section.links.map((link, i) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" key={i} className="hover:underline transition-all duration-300 cursor-pointer hover:text-primary">
                    {link.name}
                  </a>
                ))}
              </ul>}
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © GaddiBazaar All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
