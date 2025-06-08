import React, { useEffect } from "react";
import { Button, IconButton, Avatar } from "@mui/material";
import { Facebook, LinkedIn, Instagram } from "@mui/icons-material";
import {  FooterComponent } from "../../Components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const team = [
    {
      name: "Myat Poe Eain",
      role: "Finance & Operation Leader",
      image: "/public/team/mye.jpg",
      socials: {
        facebook: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Phyo Thura",
      role: "CEO & Fullstack Developer",
      image: "/public/team/pty.jpg",
      socials: {
        facebook:
          "https://www.facebook.com/profile.php?id=100077023871140&mibextid=LQQJ4d",
        linkedin: "https://www.linkedin.com/in/phyothura21/",
        instagram:
          "https://www.instagram.com/vik83124?igsh=MWdtMmphc3hodjBucg%3D%3D&utm_source=qr",
      },
    },
  ];

  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="text-black font-sans">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-black opacity-95"></div>
        <div className="relative max-w-4xl text-white" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg transition-all duration-500 hover:scale-105">
            About Perfume Store
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Crafting unforgettable scents that tell your story. Discover
            passion, quality, and elegance in every bottle.
          </p>
          <Button
            onClick={() => nav("/products")}
            variant="outlined"
            color="white"
            sx={{
              mt: 6,
              px: 6,
              py: 1.5,
              fontWeight: "bold",
              fontFamily: "Poppins",
            }}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Story Section */}
      <section
        className="max-w-6xl mx-auto py-16 px-6 md:flex md:items-center md:gap-12"
        data-aos="fade-up"
      >
        <div className="md:flex-1 mb-10 md:mb-0">
          <img
            src="/about-us.jpg"
            alt="Perfume bottle with flowers"
            className="rounded-lg shadow-lg w-full object-cover h-80 md:h-[450px]"
          />
        </div>
        <div className="md:flex-1">
          <h2 className="text-4xl font-bold mb-6 text-dark-500">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Founded in 2025, Perfume Store was born from a passion for exquisite
            fragrances and timeless elegance. We believe that a scent is not
            just a fragrance, but a memory waiting to be created.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Every bottle is carefully crafted with the finest ingredients,
            blending tradition with innovation to bring you unique perfumes that
            inspire confidence and charm.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-dark-500">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            At Perfume Store, we live by values that shape every scent we craft.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 hover:shadwow-2xl duration-700 hover:bg-gray-100 hover:opacity-90 ease-in-out cursor-pointer rounded-xl shadow-md border">
            <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
            <p className="text-gray-600">
              We use only real ingredients and original blends.
            </p>
          </div>
          <div className="p-6 hover:shadwow-2xl duration-700 hover:bg-gray-100 hover:opacity-90 ease-in-out cursor-pointer rounded-xl shadow-md border">
            <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
            <p className="text-gray-600">
              Every bottle is a work of art, blended with care.
            </p>
          </div>
          <div className="p-6 hover:shadwow-2xl duration-700 hover:bg-gray-100 hover:opacity-90 ease-in-out cursor-pointer rounded-xl shadow-md border">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We’re committed to eco-friendly and ethical practices.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-dark-500">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real experiences from fragrance lovers around the world.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">
              “Absolutely love the scent! It lasts all day and gets me
              compliments everywhere I go.”
            </p>
            <h4 className="font-semibold text-md text-right">— Sophia R.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic mb-4">
              “The packaging is elegant and the smell is divine. I’ll be a
              repeat customer for sure.”
            </p>
            <h4 className="font-semibold text-md text-right">— Michael T.</h4>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-6" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-dark-500">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Passionate professionals dedicated to bringing you the best
            fragrances.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
          {team.map(({ name, role, image, socials }) => (
            <div
              key={name}
              className="bg-white rounded-xl shadow-lg justify-center p-6 flex flex-col items-center"
            >
              <Avatar
                alt={name}
                src={image}
                sx={{ width: 120, height: 120, mb: 4, boxShadow: 3 }}
              />
              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              <p className="text-gray-600 mb-4">{role}</p>
              <div className="flex space-x-3">
                <IconButton
                  component="a"
                  href={socials.facebook}
                  target="_blank"
                  aria-label="Facebook"
                  sx={{ color: "#3b5998" }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  component="a"
                  href={socials.linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                  sx={{ color: "#0077b5" }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component="a"
                  href={socials.instagram}
                  target="_blank"
                  aria-label="Instagram"
                  sx={{ color: "#C13584" }}
                >
                  <Instagram />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
      >
        ↑ Top
      </button>

     <FooterComponent/>
    </div>
  );
};

export default AboutPage;
