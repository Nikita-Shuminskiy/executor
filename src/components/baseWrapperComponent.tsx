import React, {forwardRef, useEffect} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {GestureResponderEvent, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView} from 'react-native'
import {colors} from '../assets/colors/colors'
import {StatusBar} from 'expo-status-bar'

type BaseWrapperComponentType = {
    children: JSX.Element | JSX.Element[]
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    isKeyboardAwareScrollView?: boolean
    styleSafeArea?: any
    contentContainerStyle?: any
    handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}
export const BaseWrapperComponent = forwardRef(({
                                         children,
                                         onTouchEnd,
                                         onTouchStart,
                                         isKeyboardAwareScrollView = false,
                                         styleSafeArea,
                                         contentContainerStyle,
                                         handleScroll
                                     }: BaseWrapperComponentType, ref) => {
    //const ref = React.useRef(null)

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 10 : 40,
                backgroundColor: colors.white, ...styleSafeArea
            }}>
            {isKeyboardAwareScrollView ? (
                <KeyboardAwareScrollView
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    ref={ref}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        backgroundColor: colors.white,
                        width: '100%',
                        ...contentContainerStyle
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                children
            )}
        </SafeAreaView>
    )
})
