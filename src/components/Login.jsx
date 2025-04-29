import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
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
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(name, photo)



    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accepts our terms and conditions");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number, and special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

            // Email verification sent!
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
    });

    //Ubdate ProfileUser
    const profile = {
      displayName: name,
      photoURL: photo,
    };

    updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log("ubdate user profle");
      })
      .catch((error) => console.log(error));


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
        <h1 className="text-4xl font-bold text-accent text-center">Register</h1>
        <form className="card-body" onSubmit={handleFormSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
            />

            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo URL"
              className="input input-bordered"
            />

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

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-8 text-xl text-gray-400"
            >
              {showPassword ? <FaRegEyeSlash /> : <FiEye />}
            </button>

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-1">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-success"
              />
              <span className="label-text ml-6">
                Accept Our TermsAnd Condions
              </span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-accent w-full">Login</button>
          </div>
        </form>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mt-2">Login Successful!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
