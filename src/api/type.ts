import {NavigationProp, ParamListBase} from "@react-navigation/native";

export enum LanguageEnum {
    EN = 'EN',
    PL = 'PL',
    RU = 'RU'
}

type CountryType = {
    country: string;
    currency: string;
    tel_mask: string;
    tel_prefix: string;
};

type UnitType = {
    detailed_description: string;
    id: string;
    name: string;
};
type ExecutorType = {
    consent_datetime: null | string;
    executor_logistic_partners_points_id: null | string;
    country: string;
    disabled: null | string;
    email: string;
    executor_approve_datetime: null | string;
    executors_id: string;
    first_name: string;
    language: LanguageEnum;
    last_name: string;
    patronymic_name: null | string;
    phone: string;
    phone_verify_datetime: string;
}
type PhotosApprovalType = {
    admins_id?: null,
    admins_verdict?: null,
    datetime?: string,
    executors_id?: number,
    filename: string
    id: any
    type_of_photo?: PhotoCategoryEnum
}
type ExecutorSettingType = {
    country: CountryType;
    countries: CountryType[];
    executors: ExecutorType;
    languages: string[];
    status: string;
    units: UnitType[];
    executor_photos_for_approval: PhotosApprovalType[];
};

type LogisticsPointType = {
    id: string;
    logistic_partners_id: string;
    lat: string;
    lon: string;
    point_name: string;
    address: string;
    comment: string;
    hours: string;
    disabled: null | any; // ??
    country: string;
    name: string;
};

type UpdateExecutorPayloadType = {
    phone?: string,
    photo?: string,
    country?: string,
    first_name?: string,
    last_name?: string,
    language?: string,
    email?: string,
    lat?: string,
    lon?: string,
    address?: string,
    services_units?: string,
    executor_logistic_partners_points_id?: string,
    patronymic_name?: string,
    consent_datetime?: string
}

enum PhotoCategoryEnum {
    DOC = 'doc',
    FACE = 'face',
    WASH = 'wash',
    IRON = 'iron',
    ROOM = 'room',
    ADDRESS = 'address',
}

type PhotoPayloadType = {
    type_of_photo?: PhotoCategoryEnum
    photo: string
}
type AuthGooglePayload = {
    id_token: string
    server_auth_code: string
    language?: string
    country?: string
}
type CommonScreenPropsType = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
type PhotoType = { 'filename': string, 'id': string }
export {
    PhotoType,
    PhotosApprovalType,
    PhotoCategoryEnum,
    CommonScreenPropsType,
    PhotoPayloadType,
    AuthGooglePayload,
    ExecutorSettingType,
    UpdateExecutorPayloadType,
    LogisticsPointType,
    UnitType,
    CountryType,
}
