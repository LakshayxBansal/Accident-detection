import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input'; 
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';

export const SignUpCard = ({ setState }) => {
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


  return (
    <Card className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-lg">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to Continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" action="">
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
          <Button type="submit" className="w-full" size="lg">Continue</Button>
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

          <GoogleLogin
            onSuccess = {handleGithubSuccess}
            onError = {handleGithubError}
            render={({ onClick }) => (
              <Button onClick={onClick} variant="outline" size="lg" className="w-full relative">
                <FaGithub className="size-5 absolute top-3 left-3"/>
                Continue with Github
              </Button>)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account? <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
