import {w} from 'utils/responsive';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import {TextInput} from 'react-native';
import AppText from '../widgets/Text';
import colors from 'theme/colors';
import {family} from 'theme';

interface TextInputProps {
  name: string;
  control: any;
  rules: any;
  defaultValue?: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  width?: string;
  isRequired?: boolean;
  customChange?: any;
  hasIcon?: boolean;
  multiline?: boolean;
  onFocus?: any;
  isFocused?: boolean;
  keyboardType?: 'numeric' | 'email-address';
}

export default function AppTextInput({
  name,
  control,
  rules = {},
  defaultValue,
  placeholder,
  label,
  disabled,
  width,
  isRequired,
  customChange,
  hasIcon,
  multiline,
  onFocus,
  isFocused,
  keyboardType,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}: any) => (
          <View style={{gap: w(4)}}>
            {label && (
              <AppText
                style={{
                  fontSize: w(12),
                  lineHeight: w(18),
                  fontWeight: '500',
                  color: colors.grey700,
                }}>
                {label}
              </AppText>
            )}
            <View>
              <TextInput
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChangeText={val => {
                  onChange(val);
                  customChange && customChange(val);
                }}
                autoCapitalize={
                  keyboardType === 'email-address' ? 'none' : 'sentences'
                }
                keyboardType={keyboardType ? keyboardType : 'default'}
                value={value}
                style={{
                  paddingVertical: w(12),
                  paddingHorizontal: w(16),
                  borderWidth: w(1),
                  borderRadius: w(12),
                  borderColor: colors.grey100,
                  backgroundColor: '#FDFDFD',
                  color: colors.grey800,
                  height: multiline ? w(80) : w(48),
                  textAlignVertical: multiline ? 'top' : 'center',
                  fontFamily: family.Regular,
                  lineHeight: w(12),
                  fontSize: w(12),
                }}
                placeholderTextColor={colors.grey300}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
              />
            </View>
            {error?.message && (
              <AppText
                type="body"
                style={{color: 'red', fontSize: w(10), lineHeight: w(12)}}>
                {error?.message || ''}
              </AppText>
            )}
          </View>
        )}
      />
    </View>
  );
}
