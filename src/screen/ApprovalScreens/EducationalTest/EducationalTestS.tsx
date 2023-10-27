import React from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {CommonScreenPropsType} from "../../../api/type";
import {Box, Text} from "native-base";

type EducationalTestSProps = CommonScreenPropsType & {}
const EducationalTestS = observer(({navigation}: EducationalTestSProps) => {
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box>
                <Text> Education test</Text>
            </Box>
        </BaseWrapperComponent>
    );
});

export default EducationalTestS;