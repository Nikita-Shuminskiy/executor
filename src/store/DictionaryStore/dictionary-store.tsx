import {makeAutoObservable} from 'mobx'
import {deviceStorage} from "../../utils/storage/storage";
import {authApi} from "../../api/authApi";

export type DictionaryType = {
    [key: string]: string
}

export class DictionaryStore {
    dictionary: DictionaryType | null = null
    selectedLanguage: string = 'en'

    setDictionary = (dictionary: DictionaryType) => {
        this.dictionary = dictionary
    }
    setSelectedLanguage = (lan: string) => {
        this.selectedLanguage = lan
    }
    sendDictionary = async (language) => {
        try {
            const {data} = await authApi.getDictionary({language: language})
            await deviceStorage.saveItem('dictionary', JSON.stringify(data))
            await deviceStorage.saveItem('selectedLanguage', language)
            this.setDictionary(data)
            this.setSelectedLanguage(language)
        } catch (e) {
        }
    }
    getDictionaryLocal = async (languages = 'en') => {
        try {
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            await this.sendDictionary(selectedLanguage ?? languages )
        } catch (e) {
        }
    }
    constructor() {
        makeAutoObservable(this);
    }
}

export default new DictionaryStore()
