import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaUser } from 'react-icons/fa'

const Footer = () => {
    const navigate = useNavigate()
  const linkSections = [
    {
      title: "QUICK LINKS",
      links: [
        {
            url: '/',
            name: 'Home'
        },
        {
            url: '/cars',
            name: 'Browse Cars'
        },
        {
            url: '/list-car',
            name: 'List Your Car'
        },
        {
            url: '/contact-us',
            name: 'Contact Us'
        }
      ]
    },
    {
      title: "RESOURCES",
      links: [
        {
            url: '/help-center',
            name: 'Help Center',
        },
        {
            url: '/terms-and-conditions',
            name: 'Terms & Conditions',
        },
        {
            url: '/privacy-policy',
            name: 'Privacy Policy',
        },
        {
            url: '/insurance',
            name: 'Insurance',
        }
      ]
    },
    {
      title: "FOLLOW US",
      links: [
        {
            url: 'https://x.com/Prajapatiamitap',
            name: 'Twitter(X)',
            image: <FaTwitter/>
        },
        {
            url: 'https://www.linkedin.com/in/amit-prajapati-0544882b5/',
            name: 'LinkedIn',
            image: <FaLinkedin/>
        },
        {
            url: 'https://github.com/amit-prajapati-ap',
            name: 'GitHub',
            image: <FaGithub/>
        },
        {
            url: 'https://portfolio-amit-prajapati.vercel.app/',
            name: 'Portfolio',
            image: <FaUser/>
        }
      ]
    },
  ];
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-window mx-auto border-t border-gray-500/60">
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
        <div className="flex max-md:flex-wrap lg:justify-around w-full xl:w-[45%] gap-20 md:gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              {section.title === "QUICK LINKS" || section.title === "RESOURCES" ? <ul className="text-sm space-y-1 flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li onClick={() => {navigate(link.url); scrollTo(0, 0)}} key={i} className="hover:underline transition-all duration-300 cursor-pointer hover:text-primary">
                    {link.name}
                  </li>
                ))}
              </ul> : <ul className="flex flex-col gap-2 text-sm space-y-1">
                {section.links.map((link, i) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" key={i} className="hover:underline transition-all duration-300 cursor-pointer hover:text-primary flex gap-2">
                    {link.image}
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
