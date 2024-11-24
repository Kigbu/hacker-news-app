import AppText from 'components/widgets/Text';
import {SelectItem} from 'core/interfaces/select-item.interface';
import colors from 'theme/colors';
import {height} from 'utils/dimensions';
import {w} from 'utils/responsive';
import {CloseSquare} from 'iconsax-react-native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

interface SelectModalProps {
  visible: boolean;
  onDismiss: any;
  onChange: any;
  options: SelectItem[];
  label: string;
}

const SelectModal: React.FC<SelectModalProps> = React.memo(
  ({visible, onDismiss, options, label, onChange}: SelectModalProps) => {
    // const styles = useStyleSheet(themedStyles);
    return (
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        avoidKeyboard={true}
        // transparent={true}
        // onBackdropPress={onDismiss}
        // backdropStyle={styles.backdrop}
        style={styles.modalWrapper}>
        <View
          style={{
            paddingHorizontal: w(24),
            backgroundColor: 'white',
            height: height * 0.7,
            borderRadius: w(16),
          }}>
          <View style={[styles.modalHeader, {marginBottom: 10}]}>
            <View style={styles.titleWrapper}>
              <AppText style={{fontSize: w(16), color: '#3D3D3D'}}>
                {label}
              </AppText>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <CloseSquare
                variant={'Broken'}
                color={colors.grey500}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalBody}>
              {options &&
                options.map((option, index) => (
                  <TouchableOpacity
                    style={styles.option}
                    key={option.value}
                    onPress={() => {
                      onChange(option.value);
                      onDismiss();
                    }}>
                    <AppText style={{color: '#3D3D3D'}}>{option.label}</AppText>
                  </TouchableOpacity>
                ))}
              {(!options || options.length === 0) && (
                <AppText
                  style={{
                    color: '#3D3D3D',
                    textAlign: 'center',
                    fontSize: 14,
                  }}>
                  No item to select
                </AppText>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  },
);

export default SelectModal;

const styles = StyleSheet.create({
  modalWrapper: {
    // backgroundColor: 'white',
    // width: width,
    // height: height * 0.5,
    // marginTop: height * 0.15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: w(24),
    // paddingVertical: 4,
    // paddingBottom: w(24),
    // bottom: -(wi * 0.2),
    // marginTop: w(56),
    // bottom: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingVertical: 16,
  },
  icon: {
    width: w(16),
    height: w(16),
    tintColor: 'text-basic-color',
  },
  modalBody: {
    paddingBottom: 8,
    gap: w(8),
  },
  titleWrapper: {
    width: 250,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: w(8),
    backgroundColor: colors.grey50,
  },
});
