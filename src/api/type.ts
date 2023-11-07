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
    executor_exam_datetime: null | string;
    datetime_freeze_until: null | string;
    executor_approve_admin_id: null | string;
    executor_logistic_partners_points_id: null | string;
    country: string;
    fcm_token: string;
    id: string;
    lat: string;
    lon: string;
    disabled: null | string;
    executor_approve_refuse_text: null | string;
    email: string;
    datetime_workshift_until: string
    executor_approve_datetime: null | string;
    executors_id: string;
    rating: string;
    ready_for_orders: string;
    phone_verify_code: string;
    phone_verify_code_lifetime: string;
    first_name: string;
    language: LanguageEnum;
    last_name: string;
    patronymic_name: null | string;
    phone: string;
    user: string;
    pic: string
    phone_verify_datetime: string;
}
enum ApprovedEnum  {
    APPROVED = 1,
    DONT_APPROVED = 0
}
type PhotosApprovalType = {
    admins_id?: null,
    approved?: null | ApprovedEnum,
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
    message: string
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
    ApprovedEnum,
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
