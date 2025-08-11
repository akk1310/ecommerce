import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-10 bottom-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt="contact"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Shop No. 24, Ground Floor, Sapphire Mall,
            <br />
            Sector 49, Sohna Road,
            <br />
            Gurugram, Haryana 122018
          </p>
          <p className="text-gray-500 mt-2">
            📞 0124-4567890
            <br />
            ✉️ support@gonbgo.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Stores at GrabNGo
          </p>
          <p className="text-gray-500">
            Learn more about our teams & <br />How to open a Store on our Platform.
          </p>
          <a target="_blank" href="https://ecommerce-admin-ochre-gamma.vercel.app">
          <div className="border cursor-pointer border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"> Explore Stores </div>
          </a>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
