import {w} from 'utils/responsive';
import React from 'react';
import {View} from 'react-native';
import AppText from '../widgets/Text';
import colors from 'theme/colors';

interface AuthBottomActionProps {
  onPress: any;
  text: string;
  linkText: string;
  disabled: boolean;
}
export default function AuthBottomAction({
  onPress,
  text,
  linkText,
  disabled = false,
}: AuthBottomActionProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: w(4),
      }}>
      <AppText
        type="body"
        style={{fontSize: w(12), fontWeight: '400', lineHeight: w(16.6)}}>
        {text}
      </AppText>
      <AppText
        onPress={() => onPress()}
        type="body"
        style={{
          color: disabled ? colors.grey600 : colors.primary700,
          fontWeight: 'bold',
          fontSize: w(12),
          lineHeight: w(16.6),
        }}>
        {linkText}
      </AppText>
    </View>
  );
}
