import React from 'react';
import {Controller} from 'react-hook-form';
import {SearchNormal1} from 'iconsax-react-native';
import {TextInput, View} from 'react-native';
import {w} from 'utils/responsive';
import colors from 'theme/colors';
import {family} from 'theme';
import AppText from '../widgets/Text';
interface SearchTextInputProps {
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
  onFocus?: () => void;
  isFocused?: boolean;
  keyboardType?: 'numeric' | 'email-address';
  onBlur?: () => void;
  onSubmitEditing: () => void;
}

const SearchTextInput = React.forwardRef<TextInput, SearchTextInputProps>(
  (
    {
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
      onBlur,
      onSubmitEditing,
    }: SearchTextInputProps,
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleState = () => {
      setShowPassword((showState: any) => {
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
              <View style={{position: 'relative', justifyContent: 'center'}}>
                <TextInput
                  ref={ref}
                  placeholder={placeholder}
                  onChangeText={val => {
                    onChange(val);
                    customChange && customChange(val);
                  }}
                  onSubmitEditing={() => {
                    // Trigger your search method
                    onSubmitEditing();
                  }}
                  keyboardType={keyboardType ? keyboardType : 'default'}
                  value={value}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  style={{
                    paddingLeft: w(48),
                    paddingVertical: w(8),
                    paddingHorizontal: w(16),
                    // borderWidth: w(1),
                    borderRadius: w(14),
                    borderColor: colors.grey100,
                    backgroundColor: colors.grey50,
                    color: colors.grey800,
                    height: multiline ? w(80) : w(40),
                    fontFamily: family.Regular,
                    lineHeight: w(12),
                    fontSize: w(12),
                  }}
                  returnKeyType={'search'}
                  placeholderTextColor={colors.grey300}
                  multiline={multiline}
                  numberOfLines={multiline ? 4 : 1}
                />
                <View style={{position: 'absolute', paddingHorizontal: w(16)}}>
                  <SearchNormal1
                    variant={'Outline'}
                    size={w(20)}
                    color={'#999999'}
                  />
                </View>
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
  },
);

export default SearchTextInput;
