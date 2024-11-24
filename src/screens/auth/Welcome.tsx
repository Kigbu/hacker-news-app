import React from 'react';
import {Image, View} from 'react-native';
import SafeAreaComp from '../../components/Layout/SafeAreaComp';
import {height, width} from '../../utils/dimensions';
import {w} from '../../utils/responsive';
import AppText from '../../components/widgets/Text';
import MyAppButton from '../../components/Form/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SIGN_IN, SIGN_UP} from '../../core/constants/screen-names';

// import {APP_VERSION} from 'core/constants/device-info';

// const welcome_bg = require("../../assets/images/bg/welcome_bg.png");

export default function Welcome() {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  // const router = useRouter();

  return (
    <SafeAreaComp refreshing={false}>
      <View style={{minHeight: height, gap: w(32)}}>
        <View style={{flex: 8}}>
          <View
            style={{
              flex: 4,
              width: width - w(48),
              // height: width,
              // backgroundColor: 'grey',
              // justifyContent: 'space-between',
            }}>
            {/* <Image
              style={{
                width: width - w(48),
                height: "100%",
                resizeMode: "contain",
                alignSelf: "center",
              }}
              source={welcome_bg}
            /> */}
          </View>

          <View style={{gap: w(12)}}>
            <AppText
              style={{
                fontSize: w(26),
                fontWeight: '700',
                lineHeight: w(31),
                letterSpacing: -0.52,
                // marginRight: 'auto',
                color: '#262626',
              }}>
              Join our community
            </AppText>

            <AppText
              style={{
                fontSize: w(14),
                fontWeight: '400',
                lineHeight: w(20),
                letterSpacing: 0.52,
                // marginRight: 'auto',
                color: '#5D5D5D',
                // textAlign: 'center',
              }}>
              Join a network of agents committed to improving payment
              experiences across communities, take the step towards a rewarding
              future!
            </AppText>
          </View>
        </View>

        <View style={{flex: 1, gap: w(24)}}>
          <MyAppButton
            buttonVariant={'solid'}
            label={'Sign in'}
            onPress={() => {
              // router.push(`/(auth)/sign-in`);
              navigation.navigate(SIGN_IN);
            }}
            loading={false}
            disabled={false}
          />

          <MyAppButton
            label={'Sing Up'}
            onPress={() => {
              // router.push(`/(auth)/sign-up`);
              navigation.navigate(SIGN_UP);
            }}
            loading={false}
            disabled={false}
            buttonVariant={'outline'}
          />
        </View>

        {/* <View style={{flex: 0.5}}>
          <AppText
            style={{
              textAlign: 'center',
              fontSize: h(12),
              color: colors.grey700,
              marginTop: h(20),
              fontWeight: 'bold',
            }}>
            v{APP_VERSION}
          </AppText>
        </View> */}
      </View>
    </SafeAreaComp>
  );
}
