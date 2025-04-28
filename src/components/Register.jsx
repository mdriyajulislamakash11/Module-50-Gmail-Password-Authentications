import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from './farebase.init';

const Register = () => {
  const[success, setSuccess] = useState(false)
  const [error, setError]=useState("")


const handleRegister = (event) => {
  event.preventDefault()
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password)

  setSuccess(false)
  setError("")


  signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    console.log(result.user)
    setSuccess(true)
  })
  .catch((error) => {
    console.log(error.message)
    setError(error.message)
  });

}




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
                name='email'
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
                name='password'
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent w-full">Login</button>
            </div>

            {
              success && <p className='text-green-600'>log in successfullu</p>
            }

            {
              error && <p className='text-red-600'>{error}</p>
            }
          </form>
        </div>
      </div>
    );
};

export default Register;