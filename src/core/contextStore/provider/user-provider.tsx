import React from 'react';
import {UserContext} from '../context/user-context';
import User from 'core/models/user.model';
import {L} from 'utils/helpers';

export default function UserProvider({
  children,
  userPinStatus,
  setUserPinStatus,
  accessToken,
  setAccessToken,
  initialAuthScreen,
  setInitialAuthScreen,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
}: any) {
  //
  const [flowComplete, setFlowComplete] = React.useState(false);
  const [isExpired, setIsExpired] = React.useState(false);
  const [refCode, setRefCode] = React.useState('');
  const [client, setClient] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [disable, setDisableResend] = React.useState(true);
  const [alertClass, setAlertClass] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [banks, setBanks] = useState([]);
  const [linkingParams, setLinkingParams] = React.useState(null);

  // sing up
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [fullName, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [userId, setUserId] = React.useState<string>('');
  const [userIdentifier, setUserIdentifier] = React.useState<string>('');
  const [isResetPassword, setIsResetPassword] = React.useState<boolean>(false);

  const userContextValue = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    alertClass,
    setAlertClass,
    isLoading,
    setIsLoading,
    linkingParams,
    setLinkingParams,
    loggedIn,
    setLoggedIn,
    initialAuthScreen,
    setInitialAuthScreen,

    firstName,
    setFirstName,
    lastName,
    setLastName,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
