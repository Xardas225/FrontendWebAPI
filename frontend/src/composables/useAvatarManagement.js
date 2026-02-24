import {
    useUserStore
} from "@/store/user";

export const useAvatarManagement = () => {

    const userApi = useUserStore()

    const uploadUserAvatar = async (id, file) => {
        try {
            const formData = new FormData();

            formData.append("userId", id);
            formData.append("file", file);

            await userApi.setUserAvatar(formData);
        } catch (error) {
            console.error(error)
        }
    }

    return {
        uploadUserAvatar
    }
}