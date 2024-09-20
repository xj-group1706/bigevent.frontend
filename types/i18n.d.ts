declare module "vue" {
  interface ComponentCustomProperties {
    useLocalePath: () => (routeName: string, locale?: string) => string;
  }
}

declare module "#i18n" {
  export function useLocalePath(): (
    routeName: string,
    locale?: string
  ) => string;
}

declare module "@nuxtjs/i18n/dist/runtime/composables" {
  export function useLocalePath(): (
    routeName: string,
    locale?: string
  ) => string;
}
