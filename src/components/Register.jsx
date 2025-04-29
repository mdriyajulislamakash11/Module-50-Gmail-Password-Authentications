import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "./farebase.init";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef()

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    setSuccess(false);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if (!result.user.emailVerified) {
          setError("pease verify your email");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if(!email){
      alert("please provide a valid email address")
    }else{
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("passWord reset email")
      })
    }


  };

  return (
    <div className="flex justify-center my-24">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-4xl font-bold text-accent text-center">Login</h1>
        <form className="card-body" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label onClick={handleForgetPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-accent w-full">Login</button>
          </div>

          {success && <p className="text-green-600">log in successfullu</p>}

          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
