import { useI18n } from "vue-i18n";

export const useTranslate = () => {
  const { t } = useI18n();

  return { t };
};
