import {
    defineStore
} from "pinia";
import api from "@/api/api";


export const useVisionService = defineStore('visionService', () => {

    const detectFile = async (file) => {
        try {

            const formData = new FormData()
            formData.append("file", file)

            const {
                data
            } = await api.post(`/detection`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            return data;
        } catch (error) {
            console.log(error.message);
            return {
                success: false,
                error: this.error
            }
        }
    }

    return {
        detectFile
    }

}, {
    persist: true
})