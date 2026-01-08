import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Slider from "react-slick";

export default function Fonctionnaires() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
  };

  let { User, setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("employers") !== null) {
      setUser(JSON.parse(localStorage.getItem("employers")));
    }
  }, []);

  return (
    <>
      <div className="mt-10 py-5 mx-auto w-3/4">
        <Slider {...settings}>
          {User.map((emp, index) => (
            <div key={index}>
              <img
                src={emp.imageBase64}
                className="img mx-auto rounded-full"
                alt=""
              />

              <div className="w-full bg-transparent py-8  border-2 border-gray-600 rounded-lg">
                <h1
                  id="fonctionnairename"
                  className="text-center py-3 relative text-lg font-bold"
                >
                  {" "}
                  {emp.name}
                </h1>

                <h3 className="text-center py-3 text-lg text-gray-500">
                  {emp.job}
                </h3>

                <p className="text-center text-lg py-3">{emp.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
