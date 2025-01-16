import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input'; 
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiOnlyfans } from "react-icons/si";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const SignUpCard = ({ setState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSuccess = (response) => {
    console.log('Google Sign Up Success:', response);
    // Handle Google sign up success, e.g., send token to your backend
  };

  const handleGoogleError = (error) => {
    console.error('Google Sign Up Error:', error);
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

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
  }

  try {
    // Call the backend signup endpoint
    const response = await axios.post("http://localhost:3000/v1/user/register", {
      name,
      email,
      password,
    });

    if (response.data.token) {
      // Store the token in localStorage or context
      localStorage.setItem("authToken", response.data.token);
      console.log('Sign up successful:', response.data);
      // Redirect user or perform further action
    } else {
      console.log('Sign up failed: No token received');
    }
  } catch (error) {
    console.error('Sign up error:', error.response ? error.response.data : error.message);
  }
};


  return (
    <Card className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-lg">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to Continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit}>
        <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
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
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">Sign up</Button>
        </form>
        <div className="flex flex-col gap-y-2.5">

        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            render={({ onClick }) => (
              <Button onClick={onClick} variant="outline" size="lg" className="w-full relative">
                <FcGoogle className="size-5 absolute top-2.5 left-2.5"/>
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
          Already have an account? <span onClick={() => setState("signIn")} className="text-sky-500 hover:underline cursor-pointer">Sign In</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
