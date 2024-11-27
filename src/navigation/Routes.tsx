import React from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAuth from 'core/hooks/useAuth';

interface RoutesProps {
  email?: string;
  accessToken: string;
}

export default function Routes({email, accessToken}: RoutesProps) {
  const {loggedIn} = useAuth();

  return (
    <>{loggedIn ? <AppStack /> : <AuthStack email={email ? email : ''} />}</>
  );
}
