import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input'; 
import { Separator } from '../components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiOnlyfans } from "react-icons/si";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const SignInCard = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const handleGoogleSuccess = async (response) => {
  try {
    // Extract the Google OAuth token from the response
    const googleToken = response.credential;

    console.log('Google Sign Up Success:', googleToken);

    // Send the Google token to the backend for verification and user authentication
    const res = await axios.post('http://localhost:3000/v1/user/google-signup', {
      token: googleToken,
    });

    if (res.data.token) {
      // Store the JWT token returned by the backend in localStorage or Context
      localStorage.setItem('authToken', res.data.token);
      console.log('User logged in successfully:', res.data);
      // Redirect to a protected route or update the UI state accordingly
    } else {
      console.error('Google SignUp failed, no token received');
    }
  } catch (error) {
    console.error('Google SignUp Error:', error.response ? error.response.data : error.message);
  }
};


  const handleGoogleError = (error) => {
    console.error('Google Login Error:', error);
  };

  const handleGithubSuccess = (response) => {
    console.log('GitHub Login Success:', response);
    // Handle GitHub login success, e.g., send token to your backend
  };

  const handleGithubError = (error) => {
    console.error('GitHub Login Error:', error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the backend login endpoint
      const response = await axios.post("http://localhost:3000/v1/user/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Store the token in localStorage or context
        localStorage.setItem("authToken", response.data.token);
        console.log('Login successful:', response.data);
        // Redirect user or perform further action
      } else {
        console.log('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <Card className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-lg">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to Continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">Continue</Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            render={({ onClick }) => (
              <Button onClick={onClick} variant="outline" size="lg" className="w-full relative">
                <FcGoogle className="size-5 font-semibold absolute top-2.5 left-2.5"/>
                Continue with Google
              </Button>
            )}
          />

          <Button variant="outline" size="lg" className=" w-full relative">
              <FaGithub className="size-5 absolute top-3 left-3"/>
              Continue with GitHub
          </Button>

          <Button variant="outline" size="lg" className="w-full relative bg-gradient-to-r from-red-500 to-pink-500 text-white hover:bg-red-600 transition duration-200 rounded-lg shadow-lg">
            <SiOnlyfans className="absolute top-3 left-3 text-blue-300 text-2xl" />
            Continue with OnlyFans
          </Button>

        </div>
        <p className="text-xs text-muted-foreground text-black dark:text-white">
          Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-sky-500 hover:underline cursor-pointer">Sign Up</span>
        </p>
      </CardContent>
      
    </Card>
  );
};



export default SignInCard;
