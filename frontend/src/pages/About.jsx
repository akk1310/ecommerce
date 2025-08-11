import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about_img"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to <b>GrabNgo</b>, your trusted e-commerce destination where
            convenience meets quality. We bring you the latest arrivals,
            trending bestsellers, and unbeatable deals all in one place. From
            fashion and electronics to home essentials, our goal is to make
            shopping easy, fast, and affordable for everyone.
          </p>

          <p>
            With a user-friendly platform, secure payment options, and fast
            delivery, GrabNgo ensures a smooth shopping experience from start to
            finish. Our carefully curated collections and exclusive offers are
            designed to give you the best value without compromising on quality.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            At GrabNgo, our mission is simple – to redefine online shopping by
            offering products that bring joy, value, and reliability to your
            everyday life. We’re committed to building a platform that connects
            customers with the products they love, while ensuring trust,
            transparency, and exceptional service every step of the way.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We are committed to delivering only the highest quality products.
            Every item goes through a rigorous inspection process to ensure it
            meets our quality standards. Our attention to detail guarantees that
            you receive products that are reliable, durable, and crafted with
            care.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            We make your shopping experience simple and stress-free. From easy
            navigation to quick checkout and fast delivery, our platform is
            designed to save you time and effort. Shop from anywhere, anytime,
            and enjoy seamless convenience.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our customer service team is always ready to assist you with
            professionalism and care. Whether you have questions, need guidance,
            or require support, we are here to ensure that your experience with
            us is smooth, satisfying, and enjoyable.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
