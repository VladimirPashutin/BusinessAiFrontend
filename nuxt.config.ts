// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: "2025-01-31",

    css: ['primeicons/primeicons.css', 'primeflex/primeflex.css','./assets/css/main.css'],

    devtools: {enabled: false},

    devServer: { host: '127.0.0.1' },

    modules: ['@pinia/nuxt', '@primevue/nuxt-module', 'nuxt-auth-utils'],

    pinia: {
        storesDirs: ['./stores/**']
    },

    primevue: {
        components: {
            include: ['Accordion', 'Avatar', 'AutoComplete', 'Badge', 'Breadcrumb', 'Button', 'Calendar', 'Card',
                      'Carousel', 'Checkbox', 'Chip', 'Chips', 'ContextMenu', 'Dialog', 'DataTable', 'DataView',
                      'DeferredContent', 'Divider', 'Dropdown', 'Editor', 'Fieldset', 'Galleria', 'IconField',
                      'InlineMessage', 'InputGroup', 'InputGroupAddon', 'InputMask', 'InputNumber', 'InputOtp',
                      'InputSwitch', 'InputText', 'Image', 'MegaMenu', 'Menu', 'Menubar', 'Message', 'OrderList',
                      'OrganizationChart', 'OverlayPanel', 'Panel', 'PanelMenu', 'Password', 'PickList',
                      'ProgressBar', 'RadioButton', 'Rating', 'Skeleton', 'ScrollPanel', 'SelectButton',
                      'Sidebar', 'SplitButton', 'Splitter', 'Steps', 'Stepper', 'TabMenu', 'TabPanel', 'TabView',
                      'Textarea', 'TieredMenu', 'Timeline', 'Toast', 'Toolbar', 'Tooltip', 'Tree', 'TreeTable',
                      'TreeSelect', 'VirtualScroller']
        },
        options: {
            theme: {
                preset: Aura
            }
        }
    },

    routeRules: {
        '/': {prerender: true}
    },

    runtimeConfig: {
        app: {
            applicationName: 'business-ai',
            loginUrl: 'http://localhost:8118/',
            userAdminUrl: 'http://localhost:8118/',
            registrationUrl: 'http://localhost:8118/',
            businessApiUrl: 'http://localhost:8338/ai/',
            businessCommonUrl: 'http://localhost:8338/business-common/'
        }
    },

    ssr: true
})