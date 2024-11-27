import AppText from 'components/widgets/Text';
import useAuth from 'core/hooks/useAuth';
import {
  Briefcase,
  CloseCircle,
  InfoCircle,
  Lock,
  Logout,
  LogoutCurve,
  TickCircle,
} from 'iconsax-react-native';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';
import {family} from 'theme';
import {height, width} from 'utils/dimensions';
import {h, res, w} from 'utils/responsive';

export interface ActionModalProps {
  heading: string;
  type: string;
  info: string;
  infoType: string;
  setAlert?: any;
  btnTxt?: string;
  componentType?: string;
}

const ActionModal = ({
  heading,
  type,
  info,
  infoType,
  setAlert,
  btnTxt,
  componentType,
}: ActionModalProps) => {
  const [isModalVisible, setModalVisible] = useState(true);

  const {setAlertClass, setLoggedIn, setInitialAuthScreen, autoLogOutUser} =
    useAuth();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogOut = () => {
    autoLogOutUser();
    // const removeAuthParams = async () => {
    //   await localStorage.removeItem(storageKeys.FLOPAY_ACCESS_TOKEN);
    //   await localStorage.removeItem(storageKeys.LAST_LOGIN_TIMESTAMP);
    // };
    // removeAuthParams();
    // // setAlert(null);
    // setInitialAuthScreen(SIGN_IN);
    // setLoggedIn(false);
  };
  return (
    <View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {type == 'info' ? (
          <Modal isVisible={isModalVisible}>
            <View>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={() => {
                  toggleModal();
                  componentType != 'class'
                    ? setAlert(null)
                    : setAlertClass(null);
                }}>
                <CloseCircle variant={'Linear'} size={res(24)} color="#fff" />
              </TouchableOpacity>
              <View
                style={[
                  styles.AlertBox,
                  {width: '90%', borderRadius: res(10)},
                ]}>
                <View style={{paddingTop: h(20)}}>
                  {infoType == 'acctCreated' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        height: h(60),
                        width: w(60),
                        backgroundColor: '#377DFF',
                        justifyContent: 'center',
                        borderRadius: res(100),
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginBottom: h(15),
                      }}>
                      <Briefcase
                        variant={'Linear'}
                        size={res(34)}
                        color="white"
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        height: h(60),
                        width: w(60),
                        justifyContent: 'center',
                        borderRadius: res(100),
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginBottom: h(15),
                      }}>
                      <Lock variant={'Linear'} size={res(60)} color="#377DFF" />
                    </View>
                  )}
                </View>

                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={[
                        {
                          fontSize: h(30),
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: h(6),
                          fontFamily: family.ExtraBold,

                          color: '#000',
                        },
                        {fontSize: 24},
                      ]}>
                      {heading}
                    </Text>
                  </View>

                  <View style={{width: '85%'}}>
                    <View
                      style={[
                        // globalStyles.subHeadTxt,
                        {marginTop: '5%', marginBottom: h(10)},
                      ]}>
                      <Text
                        style={{
                          fontFamily: family.Regular,
                          textAlign: 'center',
                          width: '100%',
                          fontWeight: '400',
                          fontSize: h(15),
                        }}>
                        {info}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      marginBottom: 0,
                      width: '90%',
                      paddingVertical: h(10),
                    }}>
                    <TouchableOpacity
                      style={[
                        {
                          justifyContent: 'center',
                          alignItems: 'center',

                          borderRadius: w(5),
                          paddingHorizontal: w(30),
                          paddingVertical: h(12),
                          width: width * 0.85,
                          marginVertical: h(2),
                        },
                        {
                          backgroundColor: '#3861FB',
                        },
                        {width: '100%'},
                      ]}>
                      <Text
                        style={[
                          {
                            color: '#fff',
                            fontSize: h(15),
                            fontFamily: family.Medium,
                            fontWeight: '500',
                            padding: height * 0.005,
                          },
                          {color: '#fff'},
                        ]}>
                        Take Assessment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : type === 'logout' ? (
          <Modal isVisible={isModalVisible}>
            <View>
              <TouchableOpacity
                style={{marginLeft: 'auto'}}
                onPress={() => {
                  toggleModal();
                  componentType != 'class'
                    ? setAlert(null)
                    : setAlertClass(null);
                }}>
                <CloseCircle variant={'Linear'} size={res(32)} color="#fff" />
              </TouchableOpacity>
              <View
                style={[
                  styles.AlertBox,
                  {width: '90%', borderRadius: res(10)},
                ]}>
                <View style={{paddingTop: h(20)}}>
                  <View
                    style={{
                      alignItems: 'center',
                      height: h(120),
                      width: w(60),
                      justifyContent: 'center',
                      borderRadius: res(100),
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      marginBottom: h(15),
                    }}>
                    <LogoutCurve
                      variant={'TwoTone'}
                      size={w(56)}
                      color={'grey'}
                    />
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      {
                        fontSize: h(30),
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: h(6),
                        fontFamily: family.Medium,

                        color: '#000',
                      },
                      {
                        fontWeight: '600',
                        fontSize: h(24),
                        fontFamily: family.Bold,
                      },
                    ]}>
                    {heading}
                  </Text>

                  <View style={{width: '85%'}}>
                    <View style={[{marginTop: '5%', marginBottom: '10%'}]}>
                      <AppText
                        style={{
                          fontFamily: family.Regular,
                          textAlign: 'center',
                          width: '100%',
                          fontWeight: '400',
                          fontSize: h(15),
                          color: '#1c1939',
                        }}>
                        {info}
                      </AppText>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      marginBottom: 0,
                      width: '100%',
                      paddingTop: h(10),
                      paddingBottom: h(20),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={handleLogOut}
                      style={[
                        {
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3861FB',
                          borderRadius: w(5),
                          width: '40%',
                          marginVertical: h(2),
                          paddingVertical: 0,
                          paddingHorizontal: 0,
                        },

                        {},
                      ]}>
                      <AppText
                        style={[
                          {
                            color: '#fff',
                            fontSize: h(15),
                            fontFamily: family.Medium,
                            fontWeight: '500',
                            padding: height * 0.005,
                          },
                          {color: '#fff'},
                        ]}>
                        Yes
                      </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        toggleModal();
                        componentType != 'class'
                          ? setAlert(null)
                          : setAlertClass(null);
                      }}
                      style={[
                        {
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: w(5),
                          paddingHorizontal: w(30),
                          paddingVertical: h(12),
                          marginVertical: h(2),
                          width: '40%',
                          backgroundColor: '#a1bded',
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: '#fff',
                            fontSize: h(15),
                            fontFamily: family.Medium,
                            fontWeight: '500',
                            padding: height * 0.005,
                          },
                        ]}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <Modal isVisible={isModalVisible}>
            <View style={[styles.AlertBox, {padding: 20}]}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // alignItems: "center",
                }}>
                <View style={{marginRight: '5%'}}>
                  {type != 'success' ? (
                    <InfoCircle
                      variant={'Linear'}
                      size={24}
                      color="indianred"
                      onPress={toggleModal}
                    />
                  ) : (
                    <TickCircle
                      variant={'Linear'}
                      size={24}
                      color="green"
                      onPress={toggleModal}
                    />
                  )}
                </View>
                <View style={{width: '85%'}}>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.alertHeader]}>
                      {type != 'success' ? 'Error' : 'Success'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        toggleModal();
                        componentType != 'class'
                          ? setAlert(null)
                          : setAlertClass(null);
                      }}>
                      <CloseCircle variant={'Linear'} size={18} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: '5%'}}>
                    <Text style={[styles.alertInfo]}>{info}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  AlertBox: {
    width: '85%',
    backgroundColor: '#fff',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  alertHeader: {
    fontFamily: family.Bold,
    fontWeight: '600',
    color: '#121212',
  },
  alertInfo: {
    fontFamily: family.Medium,
    fontWeight: '500',
    color: '#121212',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * -0.099,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
