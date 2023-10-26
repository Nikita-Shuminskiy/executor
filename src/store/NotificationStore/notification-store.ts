import {action, makeObservable, observable} from 'mobx';import {LoadingEnum, NotificationType} from "../types/types";export class NotificationStore {    isLoading: LoadingEnum = LoadingEnum.success;    isLocalLoading: LoadingEnum = LoadingEnum.initial;    serverResponseText: string | undefined = '';    setIsLoading = (isLoading: LoadingEnum): void => {        this.isLoading = isLoading;    };    setLocalLoading = (isLoading: LoadingEnum): void => {        this.isLocalLoading = isLoading;    };    setServerErrorText = (text: string): void => {        this.serverResponseText = text;    };    setNotification = (        payload: {            serverResponse?: string | undefined,            status?: string        }    ): void => {        const {serverResponse, status} = payload        if(status === 'ok') return        if(serverResponse && status === 'error') {            this.setServerErrorText(serverResponse)            return        }        if (serverResponse) {            this.setServerErrorText(serverResponse)        }    };    constructor() {        makeObservable(this, {            isLoading: observable,            isLocalLoading: observable,            serverResponseText: observable,            setIsLoading: action,            setServerErrorText: action,            setLocalLoading: action,            setNotification: action,        });    }}export default new NotificationStore();