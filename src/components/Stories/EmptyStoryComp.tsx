import colors from 'theme/colors';
import {w} from 'utils/responsive';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Shop} from 'iconsax-react-native';
import React from 'react';
import {View} from 'react-native';
import AppText from '../widgets/Text';
import MyAppButton from '../Form/Button';

export default function EmptyStoryComp({}) {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  return (
    <View
      style={{
        paddingVertical: w(115),
        paddingTop: w(76),
        // paddingHorizontal: w(32),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          gap: w(24),
        }}>
        <View
          style={{
            gap: w(16),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: w(32),
              padding: w(28),
              backgroundColor: colors.grey50,
              alignItems: 'center',
              justifyContent: 'center',
              gap: w(16),
              width: w(80),
            }}>
            <Shop variant={'Broken'} size={w(24)} color={colors.grey300} />
          </View>

          <AppText
            style={{
              textAlign: 'center',
              color: '#555',
              fontSize: w(12),
              lineHeight: w(18),
              fontWeight: '400',
              // width: '70%',
            }}>
            You have not added any outfit yet. Outfits you add will appear here
          </AppText>
        </View>

        <View>
          <MyAppButton
            buttonVariant={'solid'}
            label="Add Outfit"
            disabled={false}
            onPress={() => {
              // navigation.navigate(ADD_OUTFIT)
            }}
          />
        </View>
      </View>
    </View>
  );
}
