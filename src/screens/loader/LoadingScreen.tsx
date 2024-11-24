import React from "react";
import SafeAreaComp from "components/Layout/SafeAreaComp";
import LoadingComp from "components/LoadingComp/LoadingComp";
import useAuth from "core/hooks/useAuth";
import { L } from "utils/helpers";

interface LoadingScreenProps {
  navigation: any;
}

export default function LoadingScreen({ navigation }: LoadingScreenProps) {
  const { user, setLoggedIn, setInitialAuthScreen, setPhone, setEmail } =
    useAuth();

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     L("Screen: Loading - effect running");
  //     L("Screen: Loading - User", JSON.stringify(user, null, 4));

  //     const checkUserAuthStatus = () => {
  //       L("Check Auth status runningggg: :::: ::::: :::: :::");
  //       if (
  //         user?.status === "PendingActivation" &&
  //         user?.roles[0].code === "TAILOR" &&
  //         !user?.isPhoneVerified
  //       ) {
  //         setPhone(user?.phone_number);

  //         setInitialAuthScreen("");
  //         setLoggedIn(false);
  //       } else if (!user?.isEmailVerified) {
  //         setEmail(user?.email);

  //         setInitialAuthScreen("");
  //         setLoggedIn(false);
  //       } else if (!user?.isPhoneVerified) {
  //         // setInitialAuthScreen(PHONE_NUMBER);
  //         setLoggedIn(false);
  //       } else if (!user?.isEmailVerified) {
  //         // setInitialAuthScreen(EMAIL_VERIFICATION);
  //         setLoggedIn(false);
  //       } else {
  //         setLoggedIn(true);
  //         // setInitialAuthScreen(ACCOUNT_TYPE);
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "MyTabs" }],
  //         });
  //       }
  //     };
  //     // if (flowComplete) {
  //     //   navigation.reset({
  //     //     index: 0,
  //     //     routes: [{name: 'MyTabs'}],
  //     //   });
  //     //   setFlowComplete(false);
  //     // } else {
  //     //   checkUserAuthStatus();
  //     // }
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <SafeAreaComp refreshing={false}>
      <LoadingComp />
    </SafeAreaComp>
  );
}
