import React from 'react';
import {Controller} from 'react-hook-form';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {TextInput, TouchableOpacity, View} from 'react-native';
import AppText from '../widgets/Text';
import colors from 'theme/colors';
import {w} from 'utils/responsive';

interface PasswordInputProps {
  name: string;
  control: any;
  rules: any;
  defaultValue?: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  width?: string;
  type?: 'text' | 'password';
  isRequired?: boolean;
  customChange?: any;
  hasIcon?: boolean;
  multiline?: boolean;
  onFocus?: any;
  isFocused?: boolean;
}

export default function PasswordInput({
  name,
  control,
  rules = {},
  defaultValue,
  placeholder,
  label,
  disabled,
  width,
  type,
  isRequired,
  customChange,
  hasIcon,
  multiline,
  onFocus,
  isFocused,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

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
          <View>
            {label && (
              <AppText style={{fontSize: w(12), color: colors.grey700}}>
                {label}
              </AppText>
            )}
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                keyboardType={'default'}
                secureTextEntry={!showPassword}
                value={value}
                autoCapitalize="none"
                style={{
                  paddingVertical: w(13),
                  paddingHorizontal: w(16),
                  // height: w(48),
                  borderWidth: w(1),
                  borderRadius: w(12),
                  borderColor: colors.grey100,
                  backgroundColor: '#FDFDFD',
                  color: colors.grey800,
                }}
                placeholderTextColor={colors.grey800}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '12%',
                  height: '100%',
                  zIndex: 99,
                  // backgroundColor: 'grey',
                  right: 0,
                }}>
                {!showPassword ? (
                  <Eye size={w(20)} variant={'Bulk'} color={colors.grey500} />
                ) : (
                  <EyeSlash
                    size={w(20)}
                    variant={'Bulk'}
                    color={colors.grey500}
                  />
                )}
              </TouchableOpacity>
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
