import React from 'react';
import {View} from 'react-native';
import AppText from '../widgets/Text';
import {w} from 'utils/responsive';
import colors from 'theme/colors';
import {family} from 'theme';

interface AuthHeaderProps {
  headText: string;
  subText: string;
}

export default function AuthHeader({headText, subText}: AuthHeaderProps) {
  return (
    <View style={{gap: w(12)}}>
      <AppText
        type="header"
        style={{
          color: colors.grey950,
          fontSize: w(28),
          fontFamily: family.ExtraBold,
          lineHeight: w(36.4),
        }}>
        {headText}
      </AppText>
      <AppText
        type="body"
        style={{fontSize: w(12), fontWeight: '400', lineHeight: w(16.8)}}>
        {subText}
      </AppText>
    </View>
  );
}
