import React from 'react';
import {Controller} from 'react-hook-form';
import {DimensionValue, StyleSheet, TouchableOpacity, View} from 'react-native';
// import { Text } from "shared-components/ui-default";
// import { size } from "core/constants/theme/size";
import {ArrowDown2} from 'iconsax-react-native';
import {SelectItem} from 'core/interfaces/select-item.interface';
import AppText from '../widgets/Text';
import {w} from 'utils/responsive';
import colors from 'theme/colors';
import SelectModal from './elements/SelectModal';

interface FormSelectInputProps {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  label: string;
  placeholder: string;
  width?: DimensionValue;
  options: SelectItem[];
  setValue: any;
  onSelectChange?: any;
  data?: any;
  applydefaultRule?: boolean;
  disabled?: boolean;
}

const FormSelectInput = React.memo(
  ({
    name,
    control,
    rules,
    defaultValue,
    label,
    placeholder,
    width,
    options,
    setValue,
    onSelectChange,
    data,
    applydefaultRule,
    disabled,
  }: FormSelectInputProps) => {
    // const styles = useStyleSheet(themedStyles);

    const [modalVisible, setModalVisible] = React.useState(false);

    const getSelectedLabel = (value: any) => {
      if (!value) return placeholder;
      const selectedOption = options.find(x => x.value === value);
      if (!selectedOption) return placeholder;
      return selectedOption.label;
    };

    const onChange = (selectedValue: any) => {
      setValue(name, selectedValue);
      if (onSelectChange) onSelectChange(selectedValue, data);
    };

    return (
      <>
        <TouchableOpacity
          style={{width: width ? width : '100%'}}
          onPress={() => setModalVisible(!modalVisible)}>
          <Controller
            name={name}
            control={control}
            rules={
              rules
                ? rules
                : applydefaultRule
                ? {required: `${label} is required`}
                : undefined
            }
            render={({field, fieldState: {error}}: any) => {
              return (
                <View style={{gap: w(6)}}>
                  {label && (
                    <AppText
                      style={{
                        fontSize: w(12),
                        color: '#3D3D3D',
                        lineHeight: w(19.2),
                        fontWeight: '600',
                      }}>
                      {label}
                    </AppText>
                  )}
                  <View style={styles.input}>
                    <AppText
                      style={{
                        fontSize: w(12),
                        color: '#3D3D3D',
                        lineHeight: w(19.2),
                        fontWeight: '600',
                      }}>
                      {getSelectedLabel(field.value)}
                    </AppText>
                    {/* <Icon
                      pack="assets"
                      name={"arrow-right"}
                      style={styles.icon}
                    /> */}
                    <ArrowDown2
                      variant={'Linear'}
                      color={colors.grey600}
                      size={20}
                    />
                  </View>
                  {error?.message && (
                    <AppText
                      type="body"
                      style={{
                        color: 'red',
                        fontSize: w(10),
                        lineHeight: w(12),
                      }}>
                      {error?.message || ''}
                    </AppText>
                  )}
                </View>
              );
            }}
          />
        </TouchableOpacity>

        <SelectModal
          label={label ? label : 'Select From List'}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onChange={onChange}
          options={options}
        />
      </>
    );
  },
);

export default FormSelectInput;

const styles = StyleSheet.create({
  input: {
    height: w(48),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: w(13),
    paddingHorizontal: w(16),
    borderWidth: w(1),
    borderRadius: w(12),
    borderColor: colors.grey100,
    backgroundColor: '#FDFDFD',
    color: colors.grey800,
  },
});
