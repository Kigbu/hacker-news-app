import {family} from 'theme';
import colors from 'theme/colors';
import {h} from 'utils/responsive';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

interface AppTextProps {
  type?:
    | 'header'
    | 'body'
    | 'modalBody'
    | 'btnText'
    | 'inputLabel'
    | 'inputErr'
    | 'steps';
  children: any;
  style?: StyleProp<TextStyle>;
  onPress?: any;
}

const AppText = ({
  type = 'body',
  children,
  style = {},
  onPress,
  ...textProps
}: AppTextProps) => {
  let textStyle;

  switch (type) {
    case 'header':
      textStyle = styles.header;
      break;
    case 'body':
      textStyle = styles.body;
      break;
    case 'modalBody':
      textStyle = styles.modalBody;
      break;
    case 'btnText':
      textStyle = styles.btnText;
      break;
    case 'inputLabel':
      textStyle = styles.inputLabel;
      break;
    case 'inputErr':
      textStyle = styles.inputErrTxt;
      break;
    case 'steps':
      textStyle = styles.steps;
      break;

    default:
      textStyle = {};
      break;
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <>
          <Text style={[textStyle, style]} {...textProps}>
            {children}
          </Text>
        </>
      </TouchableOpacity>
    );
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: h(30),
    lineHeight: h(45),
    fontFamily: family.Bold,
    color: '#1C1939',
  },
  body: {
    fontSize: h(15),
    lineHeight: h(25),
    color: colors.grey700,
    fontFamily: family.Regular,
  },

  modalBody: {
    fontSize: h(15),
    lineHeight: h(24),
    fontFamily: family.Regular,
    color: '#001533',
  },
  inputErrTxt: {
    color: 'indianred',
    fontFamily: family.Medium,
    fontSize: h(13),
  },
  inputLabel: {
    color: '#1C1939',
    fontSize: h(15),
    lineHeight: h(20),
    fontFamily: family.Regular,
    fontWeight: '400',
  },

  inputPlaceholder: {
    color: '#BEBEBE',
    fontSize: h(13),
    lineHeight: h(18),
    fontFamily: family.Regular,
  },
  btnText: {
    color: '#fff',
    fontSize: h(20),
    fontFamily: family.Medium,
  },
  steps: {
    color: '#3861FB',
    fontSize: h(15),
    lineHeight: h(25),
    fontFamily: family.Regular,
  },
});
export default AppText;
