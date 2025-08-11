import React from "react";
import { assets } from "../assets/assets";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link to="/">
          <img src={assets.logo4} className="mb-5 w-18" alt="logo" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            GrabNgo – Your One-Stop E-Commerce Destination <br /> We bring you the
            latest arrivals, trending bestsellers, and unbeatable deals, all in
            one place. From fashion and gadgets to home essentials, GrabNgo is
            here to make shopping simple, fast, and affordable.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>1800-1028-169</li>
            <li>care.india@gonbgo.com</li>
            <li className="cursor-pointer">
              {" "}
              <a target="_blank" href="/"></a> Register your{" "}
              <span className="font-semibold">store </span> now at{" "}
              <b>GrabNGo </b>{" "}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025&copy; gonbgo.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
