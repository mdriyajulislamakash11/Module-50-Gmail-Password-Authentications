import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "./farebase.init";
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("Password Shoud be 6 characters or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="flex justify-center my-24">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-4xl font-bold text-accent text-center">LogIn</h1>
        <form className="card-body" onSubmit={handleFormSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
            />

            <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-12 top-[165px]  ">
              {
                showPassword ? <FaRegEyeSlash /> : <FiEye />
              }
              
            </button>

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-accent w-full">Login</button>
          </div>
        </form>

        {error && <p className="text-red-600">{error}</p>}

        {success && <p className="text-green-600">login is SuccessFully</p>}
      </div>
    </div>
  );
};

export default Login;
