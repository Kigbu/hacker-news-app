import React from 'react';
import {height} from 'utils/dimensions';
import {TouchableOpacity, View} from 'react-native';
import AppText from 'components/widgets/Text';
import colors from 'theme/colors';
import {w} from 'utils/responsive';
import {family} from 'theme';
import {Logout, Profile} from 'iconsax-react-native';
import User from 'core/models/user.model';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ActionModal from 'components/ActionModal/ActionModal';
import useAuth from 'core/hooks/useAuth';
import SafeAreaComp from 'components/Layout/SafeAreaComp';

export default function Account() {
  const {user}: {user: User} = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  const [alertModal, setAlertModal] = React.useState<any>();

  return (
    <SafeAreaComp refreshing={false} addPaddingTop>
      <View style={{minHeight: height, gap: w(16)}}>
        <View style={{gap: w(32)}}>
          <View>
            <AppText
              style={{
                color: colors.grey950,
                fontSize: w(20),
                fontFamily: family.ExtraBold,
                lineHeight: w(26),
              }}>
              My Account
            </AppText>
          </View>

          <View
            style={{
              backgroundColor: colors.grey50,
              paddingVertical: w(12),
              paddingHorizontal: w(20),
              borderRadius: w(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: w(19),
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: w(11),
                backgroundColor: colors.grey100,
                borderRadius: 99,
              }}>
              <Profile variant={'Bulk'} size={w(20)} color={colors.grey900} />
            </View>

            <View style={{marginRight: 'auto'}}>
              <AppText
                style={{
                  color: colors.grey950,
                  fontSize: w(16),
                  fontFamily: family.ExtraBold,
                  lineHeight: w(24),
                }}>
                {user?.full_name}
              </AppText>
              <AppText
                style={{
                  color: colors.grey950,
                  fontSize: w(10),
                  fontWeight: '400',
                  lineHeight: w(15),
                }}>
                {`${user?.email}`}
              </AppText>
            </View>
          </View>

          {/* logout */}
          <TouchableOpacity
            onPress={() => {
              setAlertModal({
                heading: 'Log Out',
                type: 'logout',
                info: 'Are you sure you want to Log Out',
                infoType: '',
                btnTxt: '',
              });
            }}
            style={{
              backgroundColor: colors.grey50,
              padding: w(16),
              borderRadius: w(16),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: w(19),
            }}>
            <Logout
              variant={'Outline'}
              size={w(20)}
              color={colors.primary500}
            />

            <View style={{marginRight: 'auto'}}>
              <AppText
                style={{
                  color: colors.primary500,
                  fontSize: w(14),
                  fontWeight: '400',
                  lineHeight: w(21),
                }}>
                Log out
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {alertModal && (
        <ActionModal
          heading={alertModal.heading}
          type={alertModal.type}
          info={alertModal.info}
          infoType={alertModal.infoType}
          btnTxt={alertModal.btnTxt}
          setAlert={setAlertModal}
        />
      )}
    </SafeAreaComp>
  );
}
