import React, {useCallback, useEffect, useRef, useState} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {observer} from 'mobx-react-lite'
import rootStore from '../../../store/RootStore/root-store'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import {Box} from 'native-base'
import {ScrollView} from 'react-native'
import MessageViewer from '../../../components/list-viewer/MessageViewer/MessageViewer'
import {DialogType} from '../../../api/ChatApi/type'
import Footer from './Footer'
import arrowBottomImg from '../../../assets/Images/Chat/arrowBottomBackground.png'
import Link from '../../../components/Link'
import AuthStore from "../../../store/AuthStore/auth-store";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {routerConstants} from "../../../constants/routerConstants";
import useKeyboardStatus from "../../../utils/hook/useKeyboardStatus";

type ChatSProps = {
    navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({navigation}: ChatSProps) => {
    const {ChatStore, ChatStoreService} = rootStore
    const {dialog, setDialog} = ChatStore
    const {executorSettings} = AuthStore
    const flatListRef = useRef<any>()
    const [isAtBottom, setIsAtBottom] = useState(true)
    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        const contentHeight = event.nativeEvent.contentSize.height
        const screenHeight = event.nativeEvent.layoutMeasurement.height

        if (contentHeight - offsetY <= screenHeight + 200) {
            setIsAtBottom(true)
        } else {
            setIsAtBottom(false)
        }
    }
    const scrollToBottom = () => {
        if (flatListRef?.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({animated: true})
            }, 100)
        }
    }
    useKeyboardStatus(scrollToBottom);
    useEffect(() => {
        const id = +setInterval(() => {
            ChatStoreService.getDialog()
        }, 15000)
        return () => {
            clearInterval(id)
        }
    }, [])
    const goBack = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBack)
    return (
        <BaseWrapperComponent>
            <Box paddingX={4} mt={2} mb={2}>
                <HeaderGoBackTitle title={'Support'} goBackPress={goBack}/>
            </Box>
            <ScrollView scrollEventThrottle={16} onScroll={handleScroll} ref={flatListRef}>
                <Box paddingX={4} mb={6} mt={4} flex={1}>
                    {
                        !!dialog?.length &&
                        dialog.map((message, key) => {
                            return <MessageViewer key={`${message.message_id}-${key}`} message={message}/>
                        })
                    }
                </Box>
            </ScrollView>
            {!isAtBottom && (
                <Box position={'absolute'} bottom={'15%'} right={5}>
                    <Link onPress={scrollToBottom} img={arrowBottomImg} styleImg={{width: 42, height: 42}}/>
                </Box>
            )}
            <Box mb={2}>
                <Footer dialogLength={dialog?.length}
                        scrollToBottomHandler={() => scrollToBottom()}/>
            </Box>
        </BaseWrapperComponent>
    )
})

export default ChatS
