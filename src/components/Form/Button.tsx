import colors from 'theme/colors';
import {w} from 'utils/responsive';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AppText from '../widgets/Text';
import {family} from 'theme';

export const btnTypes = {
  WITH_TEXT: 'btnWithTxt',
};

interface ButtonProps {
  label?: string;
  width?: string;
  onPress: any;
  textColor?: string;
  textSize?: number;
  buttonVariant: 'link' | 'outline' | 'solid';
  borderColor?: string;
  iconType?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean | undefined;
  btnStyles?: StyleProp<ViewStyle>;
  iconVariant?: string; // Linear | Outline | Bold
  loading?: boolean;
  btnType?: 'btnWithTxt';
}

export default function MyAppButton({
  label,
  width,
  onPress,
  textColor,
  textSize,
  buttonVariant,
  borderColor,
  iconType,
  iconSize,
  iconColor,
  disabled,
  btnStyles,
  iconVariant, // Linear | Outline | Bold
  loading,
  btnType,
}: ButtonProps) {
  const bgColor = disabled ? '#6686FF' : '#3861FB';
  const txtColor = disabled ? 'rgba(255,255,255,0.5)' : '#fff';

  const getBgColor = () => {
    if (disabled && buttonVariant === 'solid') return colors.primary400;
    else if (disabled && buttonVariant === 'outline') return 'transparent';
    else if (!disabled && buttonVariant === 'outline') return 'transparent';
    else return colors.primary700;
  };

  const getBorderColor = () => {
    if (disabled && buttonVariant === 'outline') return colors.grey200;
    else if (!disabled && buttonVariant === 'outline') return colors.grey400;
    else return 'transparent';
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (disabled) return;
          onPress();
        }}
        style={[
          {
            width: '100%',
            // height: h(48),
            paddingVertical: w(12),
            paddingHorizontal: w(16),
            backgroundColor: getBgColor(),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: w(12),
            borderWidth: w(1),
            borderColor: getBorderColor(),
          },
          btnStyles && {...(btnStyles as object)},
        ]}>
        {loading && <ActivityIndicator color={'white'} size={'small'} />}
        <AppText
          type="body"
          style={{
            color: buttonVariant === 'outline' ? colors.grey700 : colors.white,
            fontFamily: family.Bold,
            fontSize: w(14),
            lineHeight: w(15),
          }}>
          {label}
        </AppText>
      </TouchableOpacity>
    </>
  );
}
