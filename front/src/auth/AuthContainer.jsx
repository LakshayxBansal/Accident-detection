import React, { useState } from 'react';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';
import GoogleOAuthProviderWrapper from './Google0AuthProvider';
//import Github0AuthProviderWrapper from "./Github0AuthProvider"

const AuthContainer = () => {
  const [authState, setAuthState] = useState("signIn");

  return (
    <div>
      {authState === "signIn" ? (
          <GoogleOAuthProviderWrapper>
            {/* <Github0AuthProviderWrapper>
            </Github0AuthProviderWrapper> */}
              <SignInCard setState={setAuthState} />
          </GoogleOAuthProviderWrapper>
      ) : (
        <GoogleOAuthProviderWrapper>
          {/* <Github0AuthProviderWrapper>
          </Github0AuthProviderWrapper> */}
            <SignUpCard setState={setAuthState} />
        </GoogleOAuthProviderWrapper>
      )}
    </div>
  );
};

export default AuthContainer;
