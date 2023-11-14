import {NavigationProp, ParamListBase} from "@react-navigation/native";
type ShiftSetupPayload = {
    datetime_freeze_until?: string
    datetime_workshift_until?: string
    ready_for_orders?: string
}
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
enum LastStep {
    client_received = 'client_received', // просим оценки
    auction_open = 'auction_open', // ищем исполнителя
    executor_perfomed = 'executor_perfomed',// отнеси и сдай
    client_must_get = 'client_must_get',// забери

    executor_confirm_client_must_pay = 'executor_confirm&client_must_pay',// оплати
    executor_done_client_must_pay = 'executor_done&client_must_pay',// оплати


    client_sent = 'client_sent',// в процессе
    executor_must_get = 'executor_must_get',// в процессе
    executor_received = 'executor_received',// в процессе
    executor_confirm = 'executor_confirm',// в процессе
    executor_done = 'executor_done',// в процессе
    executor_sent = 'executor_sent',// в процессе

    admin_closed_order = 'admin_closed_order',// не показывать
    client_confirm = 'client_confirm',// не показывать

}
 enum StatusOrder {
    EDITABLE = 'editable',
    IN_PROCESS = 'in_process',
    COMPLETED = 'completed'
}
export {
    ShiftSetupPayload,
    StatusOrder,
    LastStep,
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
