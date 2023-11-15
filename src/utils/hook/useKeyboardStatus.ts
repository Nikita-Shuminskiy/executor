import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';

const useKeyboardStatus = (scrollToHandler: () => void) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            handleKeyboardShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            handleKeyboardHide
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleKeyboardShow = (event: KeyboardEvent) => {
        setIsKeyboardOpen(true);
        if(Platform.OS === 'ios') {
            scrollToHandler?.()
        }
    };

    const handleKeyboardHide = (event: KeyboardEvent) => {
        setIsKeyboardOpen(false);
    };

    return isKeyboardOpen;
};

export default useKeyboardStatus;