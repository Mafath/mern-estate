import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {

  const [formData, setFormData] = useState({});
  //store any error messages if backend returns an error
  const [error, setError] = useState(null);
  //This tracks whether the form is in the process of submitting, so you can disable the button and show a loading indicator.
  const [loading,setLoading] = useState(false);
  //This hook is used to navigate to different pages in our app after the form is submitted
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent refreshing the page when we click sign up

  try {
    setLoading(true);

    //Sends a POST request to our backend (/api/auth/signup) with the form data.
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',//telling the backend that the request body contains JSON data.
      },
      body: JSON.stringify(formData),//formData object is stringified
    });

    //The response from the backend is converted to JSON
    //data refers to the result or the response that we get from the backend after sending the request
    const data = await res.json();
    console.log(data);
    

    //If the response indicates an error,
    if(data.success === false) {//middleware eken output wena 'success' ek gana kynne
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/');
  }
  catch (error) {
    setLoading(false);
    setError(data.message);    
  }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        {/* loading true nm disable wenwa */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
