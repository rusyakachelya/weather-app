import { useI18n } from 'vue-i18n';

export default {
    data() {
        return {
            i18n: useI18n(),
        };
    },
    computed: {
        locale() {
            return this.i18n.locale;
        },
    },
};