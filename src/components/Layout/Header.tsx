import React from 'react';

import {Image, Platform, StatusBar, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bag2,
  NotificationBing,
  Profile,
  SearchNormal,
} from 'iconsax-react-native';
import {h, w} from 'utils/responsive';
import colors from 'theme/colors';
import AppText from '../widgets/Text';
import {family} from 'theme';
import useAuth from 'core/hooks/useAuth';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

interface HeaderProps {
  main?: boolean;
  semiMain?: boolean;
  hasBackBtn?: any;
  route: any;
  options: any;
  navigation: any;
  hasBottomBorder?: any;
  more?: boolean;
  onMorePress?: any;
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  main,
  semiMain,
  route,
  options,
  navigation,
  hasBottomBorder,
  more,
  onMorePress,
  bgColor,
}: HeaderProps) => {
  const {user} = useAuth();

  const insets = useSafeAreaInsets();

  // Ensure we respect the top inset on iOS devices with a notch
  const safeAreaStyle =
    Platform.OS === 'ios' ? {paddingTop: insets.top + w(16)} : {};

  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            paddingTop: insets.top,
            backgroundColor: bgColor ? bgColor : 'white',
          }}
        />
      )}

      <View
        style={[
          {
            height: h(56),
            paddingHorizontal: w(24),
            justifyContent: main ? 'space-between' : 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: h(12),
            backgroundColor: bgColor ? bgColor : 'white',
            borderBottomWidth: hasBottomBorder === true ? 1 : 0,
            borderBottomColor: colors.grey400,
            gap: !main ? w(8) : w(16),
          },
        ]}>
        {main && (
          <View
            style={{
              borderWidth: w(1),
              borderColor: '#E1E1E1',
              padding: w(2),
              borderRadius: w(99),
            }}>
            <View
              style={{
                backgroundColor: '#EEE',
                borderRadius: w(99),
                padding: w(10),
                justifyContent: 'center',
                alignItems: 'center',
                width: w(40),
                height: w(40),
              }}>
              <Profile variant={'Bulk'} color={'#000000'} size={w(20)} />
            </View>
          </View>
        )}

        {main && (
          <View style={{marginRight: 'auto'}}>
            <AppText
              style={{
                fontFamily: family.ExtraBold,
                fontSize: w(16),
                lineHeight: w(24),
                color: '#1F1F1F',
              }}>
              {`Hi, ${user?.full_name || ''} 😊`}
            </AppText>
          </View>
        )}

        {main && (
          <View style={{flexDirection: 'row', gap: w(20)}}>
            {/* <SearchNormal
              size={w(22)}
              variant={'Outline'}
              color={colors.grey400}
            /> */}

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(SHOPPING_BAG)
              }}>
              <Bag2 size={w(24)} variant={'Outline'} color={colors.grey400} />
            </TouchableOpacity>

            <NotificationBing
              size={w(24)}
              variant={'Outline'}
              color={colors.grey400}
            />
          </View>
        )}

        {!main && (
          <TouchableOpacity
            style={{
              width: w(32),
              height: w(32),
              borderRadius: w(32),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: w(1),
              borderColor: colors.grey100,
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft
              variant={'Outline'}
              size={w(12)}
              color={!bgColor ? '#666666' : 'white'}
            />
          </TouchableOpacity>
        )}

        {!main && (
          <>
            <AppText
              style={{
                fontFamily: family.ExtraBold,
                // fontWeight: '600',
                fontSize: w(20),
                lineHeight: w(26),
                color: !bgColor ? colors.grey950 : 'white',
              }}>
              {options.title
                ? options.title
                : route.params?.ScreenTitle
                ? route.params?.ScreenTitle
                : route.name}
            </AppText>
          </>
        )}
      </View>
    </>
  );
};

export default Header;
