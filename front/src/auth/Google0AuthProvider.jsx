
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleOAuthProviderWrapper = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="1091268569575-s4qg54rj6ddf2b6ajaeqgsti72u71e4u.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthProviderWrapper;
