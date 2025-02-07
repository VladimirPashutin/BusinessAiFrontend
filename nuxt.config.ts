// https://nuxt.com/docs/api/configuration/nuxt-config
import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
    compatibilityDate: "2025-01-31",

    css: ['primeicons/primeicons.css'],

    devtools: {enabled: true},

    modules: ['@pinia/nuxt', '@primevue/nuxt-module', '@nuxtjs/tailwindcss'],

    pinia: {
        storesDirs: ['./stores/**'],
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
        }
    },

    routeRules: {
        '/': {prerender: true}
    },

    runtimeConfig: {
        app: {
            kafkaBroker: '192.168.0.10:29092',
            loginUrl: 'http://localhost:8118/auth/',
            authAdminUrl: 'http://localhost:8118/auth-admin/'
        }
    },

    ssr: true,

    tailwindcss: {
        config: {
            theme: {
                extend: {
                    colors: { primary: colors.green }
                }
            },
            content: {
                files: [
                    "./components/**/*.{html,js,jsx,mjs,vue,ts,tsx}",
                    "./layouts/**/*.{html,js,jsx,mjs,vue,ts,tsx}",
                    "./pages/**/*.{html,js,jsx,mjs,vue,ts,tsx}",
                    "./*.vue"
                ]
            }
        }
    },

    typescript: {
        strict: false
    }
})