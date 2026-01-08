import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import Fonctionnaires from "../Fonctionnaires/Fonctionnaires";
import { json } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import { RapportContext } from "../../Context/RapportContext";

export default function Private() {
  //hnaya dyal Declaration
  let { User, setUser, validatesucces, setvalidatesucces } =
    useContext(UserContext);
  let { rapport, setrapport } = useContext(RapportContext);
  let navigate = useNavigate();
  const [Userdelete, setUserdelete] = useState(null);

  //hnaya deconnexion Mn Private Place
  function deconnexion() {
    localStorage.removeItem("validatelogin");
    setvalidatesucces(null);
    navigate("/loginpage");
  }

  //la partie dyaL Les fonctionnaires:

  function handleFileChange(event, setFieldValue) {
    const file = event.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file); // kan7wLo L image le Base64
    }
    console.log(file);

    // m3a kay3mr hadak reader bl file kayexecétu lfunction
    reader.onloadend = () => {
      setFieldValue("imageBase64", reader.result); // kan7to la valeur de l'image F le champ dyaLha fl formik
    };
  }

  //hadi we add employers

  function addfonctionnaire(values, formik) {
    const details = {
      name: values.name,
      job: values.job,
      description: values.description,
      imageBase64: values.imageBase64,
    };

    setUser((prevValues) => {
      const strgUser = [...prevValues, details];

      localStorage.setItem("employers", JSON.stringify(strgUser));
      return strgUser;
    });
    formik.resetForm();
  }
  function deleteelmployers(values) {
    let Users = JSON.parse(localStorage.getItem("employers"));
    let related = Users.filter((elm) => elm.name !== values.name);
    localStorage.setItem("employers", JSON.stringify(related));
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      job: "",
      description: "",
      imageBase64: "",
    },
    onSubmit: addfonctionnaire,
  });
  let formik1 = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: deleteelmployers,
  });

  // hnaya gha tbda les opératoin Pour afficher les rapports:

  let formik2 = useFormik({
    initialValues: {
      rapporttitle: "",
      rapportimage64: "",
      rapportfile: "",
    },
    onSubmit: addrapport,
  });
  let formik3 = useFormik({
    initialValues: {
      rapportdelete: "",
    },
    onSubmit: deleterapportfile,
  });

  function handleFileChange2(event, setfieldvalue2, filetype) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (filetype == "pdf") {
      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onloadend = () => {
        setfieldvalue2("rapportfile", reader.result);
      };
    } else if (filetype == "image") {
      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onloadend = () => {
        setfieldvalue2("rapportimage64", reader.result);
      };
    }
  }
  function addrapport(values) {
    let details = {
      rapporttitle: values.rapporttitle,
      rapportimage64: values.rapportimage64,
      rapportfile: { uri: values.rapportfile, fileName: values.rapporttitle },
    };
    setrapport((prevvalues) => {
      const strapport = [...prevvalues, details];
      localStorage.setItem("rapporttour", JSON.stringify(strapport));
      return strapport;
    });
    formik2.resetForm();
    console.log(details);
  }
  function deleterapportfile(values) {
    let rapports = JSON.parse(localStorage.getItem("rapporttour"));
    let related = rapports.filter(
      (rpt) => rpt.rapporttitle !== values.rapportdelete
    );
    localStorage.setItem("rapporttour", JSON.stringify(related));
  }

  useEffect(() => {}, []);

  return (
    <>
      <div className="All mr-8 h-full">
        {/* had Partie dyal fonctionaires soit add soit delete */}

        <div dir="rtl" className="flex justify-between items-center py-4">
          <div className="flex w-1/2 items-center">
            <i className="fa-solid fa-user-plus fa-2x"></i>
            <h1 className="text-right text-2xl font-bold px-2"> اضافة موظف </h1>
          </div>
          <div
            dir="ltr"
            className="w-1/2  relative px-4 flex items-center space-x-1"
          >
            <i className="fa-solid fa-right-from-bracket fa-2x"></i>
            <button
              onClick={deconnexion}
              className="text-right text-white text-xl font-bold p-2 bg-red-600 rounded-lg hover:bg-red-700 "
            >
              {" "}
              تسجيل الخروج{" "}
            </button>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-2" dir="rtl">
          <div className="relative z-0 w-full py-3 group">
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-Black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              اسم الموظف
            </label>
          </div>
          <div className="relative z-0 w-full py-3 group">
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.job}
              name="job"
              id="floating_job"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-Black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_job"
              className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              وظيفة الموظف
            </label>
          </div>
          <div className="relative z-0 w-full py-3 group">
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              id="floating_description"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-Black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium absolute text-lg rounded-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              تقديم بسيط الموظف
            </label>
          </div>
          <div className="relative z-0 w-full py-3 group">
            <label
              className="block mb-2 text-lg  text-gray-500 dark:text-gray-600"
              htmlFor="floating_image"
            >
              تحميل صورة شخصية{" "}
            </label>
            <input
              value={formik.values.image}
              onChange={(event) =>
                handleFileChange(event, formik.setFieldValue)
              }
              onBlur={formik.handleBlur}
              className="block py-2.5 w-3/4 text-sm  text-gray-900 border-0 border-b-2 border-gray-300 rounded-lg cursor-pointer bg-transparent dark:text-Black focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="floating_image"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            اضافة الموظف
          </button>
        </form>

        <div dir="rtl" className="flex items-center py-4">
          <i className="fa-solid fa-user-minus fa-2x"></i>
          <h1 className="text-right text-2xl font-bold px-2"> حذف موظف </h1>
        </div>
        <form dir="rtl" className="mt-2" onSubmit={formik1.handleSubmit}>
          <div className="relative z-0 w-full py-3 group">
            <input
              type="text"
              value={formik1.values.name}
              onBlur={formik1.handleBlur}
              onChange={formik1.handleChange}
              name="name"
              id="floating_description"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              اسم الموظف المراد حذفه{" "}
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            حذف الموظف
          </button>
        </form>

        {/*had la partie dyal rapport soit add soit delete */}

        <div dir="rtl" className="flex items-center py-4">
          <i className="fa-solid fa-file-circle-plus fa-2x"></i>
          <h1 className="text-right text-2xl font-bold px-2"> اضافة محضر </h1>
        </div>

        <form dir="rtl" className="mt-2" onSubmit={formik2.handleSubmit}>
          <div className="relative z-0 w-full py-3 group">
            <input
              onChange={formik2.handleChange}
              onBlur={formik2.handleChange}
              type="text"
              value={formik2.values.rapporttitle}
              name="rapporttitle"
              id="floating_description"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium rounded-lg absolute text-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              عنوان محضر الدورة{" "}
            </label>
          </div>
          <div className="relative z-0 w-full py-3 group">
            <label
              className="block mb-2 text-lg  text-gray-500 dark:text-gray-600"
              htmlFor="floating_image"
            >
              {" "}
              صورة مصغرة للدورة{" "}
            </label>
            <input
              onChange={(event) =>
                handleFileChange2(event, formik2.setFieldValue, "image")
              }
              onBlur={formik2.handleBlur}
              type="file"
              name="rapportimage64"
              className="block py-2.5 w-3/4 text-sm text-gray-900 border-0 border-b-2 border-gray-300 rounded-lg cursor-pointer bg-transparent dark:text-Black focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="floating_image"
            />
          </div>
          <div className="relative z-0 w-full py-3 group">
            <label
              className="block mb-2 text-lg  text-gray-500 dark:text-gray-600"
              htmlFor="floating_file"
            >
              {" "}
              محضر الدورة{" "}
            </label>
            <input
              onChange={(event) => {
                handleFileChange2(event, formik2.setFieldValue, "pdf");
              }}
              onBlur={formik2.handleBlur}
              type="file"
              name="rapportfile"
              className="block py-2.5 w-3/4 text-sm text-gray-900 border-0 border-b-2 border-gray-300 rounded-lg cursor-pointer bg-transparent dark:text-Black focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="floating_file"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {" "}
            اضافة المحضر
          </button>
        </form>

        <div dir="rtl" className="flex items-center py-4">
          <i className="fa-solid fa-file-circle-minus fa-2x"></i>
          <h1 className="text-right text-2xl font-bold px-2"> حذف محضر </h1>
        </div>

        <form dir="rtl" className="mt-2" onSubmit={formik3.handleSubmit}>
          <div className="relative z-0 w-full py-3 group">
            <input
              type="text"
              value={formik3.values.rapportdelete}
              onBlur={formik3.handleBlur}
              onChange={formik3.handleChange}
              name="rapportdelete"
              id="floating_description"
              className="block py-2.5 px-0 w-3/4 text-lg rounded-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              اسم المحضر المراد حذفه{" "}
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            حذف المحضر
          </button>
        </form>
      </div>
    </>
  );
}
