import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import banner from "../../assets/p1.jpg";
import Style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function Navbar() {
  let { User, setUser, validatesucces, setvalidatesucces } =
    useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <>
      <nav
        dir="rtl"
        className="bg-[#E8B86D] text-center w-full lg:fixed top-0 right-0 left-0 z-30"
      >
        <div id="heading">
          <img id="wiz" src={banner} alt="#" />
        </div>
        <div className="row flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <ul className="flex flex-col lg:flex-row py-2">
              <li className="py-2 hover:bg-[#FFE0B5] rounded-lg">
                {" "}
                <NavLink className="mx-2  text-lg text-slate-900" to="">
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li className="py-2 hover:bg-[#FFE0B5] rounded-lg">
                {" "}
                <NavLink
                  className="mx-2  text-lg text-slate-900"
                  to="questions"
                >
                  أسئلة و أجوبة
                </NavLink>
              </li>
              <li className="py-2 hover:bg-[#FFE0B5] rounded-lg">
                {" "}
                <NavLink className="mx-2  text-lg text-slate-900" to="projects">
                  خدمات
                </NavLink>
              </li>
              <li className="py-2 hover:bg-[#FFE0B5] rounded-lg">
                {" "}
                <NavLink className="mx-2  text-lg text-slate-900" to="rapport">
                  محاضر الدورات
                </NavLink>
              </li>
              <li className="py-2 hover:bg-[#FFE0B5] rounded-lg">
                {" "}
                <NavLink
                  className="mx-2  text-lg text-slate-900"
                  to="fonctionnaires"
                >
                  اعضاء المجلس
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul className=" flex flex-col lg:flex-row px-3 py-2">
              {validatesucces !== null ? (
                <>
                  <li className="py-2 rounded-lg hover:bg-[#FFE0B5]">
                    {" "}
                    <NavLink
                      className="mx-2  text-lg text-slate-900"
                      to="/private"
                    >
                      خاص بالموظفين
                    </NavLink>
                  </li>
                  <li className="py-1 flex items-center justify-center">
                    <i className="fa-solid fa-spinner fa-spin py-3 text-green-600"></i>
                  </li>
                </>
              ) : (
                <li className="py-2 rounded-lg hover:bg-[#FFE0B5]">
                  {" "}
                  <NavLink
                    className="mx-2  text-lg text-slate-900"
                    to="/private"
                  >
                    خاص بالموظفين
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
