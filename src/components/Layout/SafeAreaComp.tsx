import {width} from 'utils/dimensions';
import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../widgets/FocusAwareStatusBar';
import {w} from 'utils/responsive';

interface SafeAreaCompProps {
  style?: StyleProp<ViewStyle>;
  children: any;
  noScrollView?: boolean;
  excludeStatusBarHeight?: boolean;
  enableRefresh?: boolean;
  refreshing: boolean;
  onRefresh?: any;
  padding?: number;
  onScrollEndDrag?: any;
  statusBarStyle?: string;
  testID?: string;
  addPaddingTop?: boolean;
}

const SafeAreaComp = ({
  children,
  style = {},
  statusBarStyle = 'dark-content',
  testID = '',
  noScrollView,
  enableRefresh,
  refreshing = false,
  onRefresh,
  padding,
  onScrollEndDrag,
  addPaddingTop = false,
  ...props
}: SafeAreaCompProps) => {
  const insets = useSafeAreaInsets();

  const statusBarBgColor =
    style && typeof style === 'object' && 'backgroundColor' in style
      ? (style as ViewStyle).backgroundColor
      : '#fff';

  // L('statusBarBgColor :::::::::::::', statusBarBgColor);

  const paddingTopIOS = addPaddingTop
    ? {paddingTop: Platform.OS === 'ios' ? insets.top : 0}
    : {};

  const wrapperView = (
    <>
      {/* <VStack
        {...props}
        p={padding ? padding : size[16]}
        pb={size[16]}
        flex={1}
        bgColor={'white'}>
        {children}
      </VStack> */}

      <View
        testID={testID}
        style={[
          {
            flex: 1,
            width: width,
            backgroundColor: '#fff',
            padding: padding ? padding : w(24),
          },
          paddingTopIOS && {...(paddingTopIOS as object)},
          style && {...(style as object)},
        ]}>
        <FocusAwareStatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBgColor}
        />

        {children}
      </View>
    </>
  );

  return (
    <>
      {noScrollView ? (
        wrapperView
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust offset as needed
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScrollEndDrag={onScrollEndDrag}
              refreshControl={
                enableRefresh ? (
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                ) : (
                  <></>
                )
              }
              // refreshControl={
              //   enableRefresh === true ? (
              //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              //   ) : null
              // }
            >
              {wrapperView}
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default SafeAreaComp;
