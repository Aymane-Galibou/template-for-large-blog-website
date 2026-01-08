import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import * as yup1 from "yup";

export default function Loginprivate() {
  let navigate = useNavigate();

  let validateform = yup1.object().shape({
    password: yup1
      .string()
      .matches(/^10500$/, "User Name is not correct")
      .required("faut entrer Password"),
  });

  let { User, setUser, validatesucces, setvalidatesucces } =
    useContext(UserContext);

  function loginemployers(values) {
    if (values.Username == "aymane" && values.password == 10500) {
      let y = "cest validée";
      setvalidatesucces(y);
      localStorage.setItem("validatelogin", y);
      navigate("/private");
    }
  }

  useEffect(() => {}, []);

  let loginform = useFormik({
    initialValues: { Username: "", password: "" },
    onSubmit: loginemployers,
    validationSchema: validateform,
  });

  return (
    <>
      <div className="flex justify-center items-center w-full py-8">
        <div className={`login`}>
          <form onSubmit={loginform.handleSubmit} className="forma">
            <h1 className="logintitle text-4xl">LOG IN</h1>
            <label htmlFor="">UserName</label>
            <input
              name="Username"
              value={loginform.values.Username}
              onChange={loginform.handleChange}
              onBlur={loginform.handleBlur}
              type="text"
            />

            <label htmlFor="">Password</label>
            <input
              name="password"
              value={loginform.values.password}
              onChange={loginform.handleChange}
              onBlur={loginform.handleBlur}
              id="code"
              type="password"
            />
            {loginform.errors.password && loginform.touched.password ? (
              <div
                className="p-3 mb-4 text-sm text-red-900 rounded-lg bg-red-50  dark:text-red-400"
                role="alert"
              >
                {loginform.errors.password}
              </div>
            ) : null}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
