import {
    ElNotification
} from 'element-plus'
import {
    CloseBold
} from '@element-plus/icons-vue'


// TODO: изменить на Composition API
export const useNotification = (title, message, type) => {
    ElNotification({
        title: title,
        message: message,
        closeIcon: CloseBold,
        type: type,
        position: 'bottom-right'
    })
}