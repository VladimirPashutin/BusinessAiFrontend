// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: "2025-01-31",

    css: ['primeicons/primeicons.css'],

    devServer: { host: 'localhost',
      cors: { origin: "*", methods: "*", allowHeaders: "*" }
    },

    devtools: {enabled: false},

    modules: ['@primevue/nuxt-module', 'nuxt-auth-utils', '@nuxtjs/tailwindcss'],

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
            },
            locale: {
                "accept": "Да",
                "addRule": "Добавить правило",
                "am": "до полудня",
                "apply": "Принять",
                "cancel": "Отмена",
                "choose": "Выбрать",
                "chooseDate": "Выбрать дату",
                "chooseMonth": "Выбрать месяц",
                "chooseYear": "Выбрать год",
                "clear": "Очистить",
                "completed": "Завершено",
                "contains": "Содержит",
                "dateAfter": "Дата после",
                "dateBefore": "Дата до",
                "dateFormat": "dd.mm.yy",
                "dateIs": "Дата равна",
                "dateIsNot": "Дата не равна",
                "dayNames": [
                    "Воскресенье",
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота"
                ],
                "dayNamesMin": [
                    "Вс",
                    "Пн",
                    "Вт",
                    "Ср",
                    "Чт",
                    "Пт",
                    "Сб"
                ],
                "dayNamesShort": [
                    "Вск",
                    "Пнд",
                    "Втр",
                    "Срд",
                    "Чтв",
                    "Птн",
                    "Сбт"
                ],
                "emptyFilterMessage": "Результатов не найдено",
                "emptyMessage": "Нет доступных вариантов",
                "emptySearchMessage": "Результатов не найдено",
                "emptySelectionMessage": "Нет выбранного элемента",
                "endsWith": "Заканчивается",
                "equals": "Равно",
                "fileChosenMessage": "{0} файлов",
                "fileSizeTypes": [
                    "Б",
                    "Кб",
                    "Мб",
                    "Гб",
                    "Тб",
                    "Пб",
                    "Эб",
                    "Зб",
                    "Йб"
                ],
                "firstDayOfWeek": 1,
                "gt": "Более чем",
                "gte": "Более чем или равно",
                "lt": "Меньше чем",
                "lte": "Меньше чем или равно",
                "matchAll": "Сопоставить все",
                "matchAny": "Совпадение с любым",
                "medium": "Нормальный",
                "monthNames": [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь"
                ],
                "monthNamesShort": [
                    "Янв",
                    "Фев",
                    "Мар",
                    "Апр",
                    "Май",
                    "Июн",
                    "Июл",
                    "Авг",
                    "Сен",
                    "Окт",
                    "Ноя",
                    "Дек"
                ],
                "nextDecade": "Следующее десятилетие",
                "nextHour": "Следующий час",
                "nextMinute": "Следующая минута",
                "nextMonth": "Следующий месяц",
                "nextSecond": "Следующая секунда",
                "nextYear": "Следующий год",
                "noFileChosenMessage": "Файл не выбран",
                "noFilter": "Нет фильтра",
                "notContains": "Не содержит",
                "notEquals": "Не равно",
                "passwordPrompt": "Введите пароль",
                "pending": "В ожидании",
                "pm": "после полудня",
                "prevDecade": "Предыдущее десятилетие",
                "prevHour": "Предыдущий час",
                "prevMinute": "Предыдущая минута",
                "prevMonth": "Предыдущий месяц",
                "prevSecond": "Предыдущая секунда",
                "prevYear": "Предыдущий год",
                "reject": "Нет",
                "removeRule": "Удалить правило",
                "searchMessage": "{0} результатов доступно",
                "selectionMessage": "{0} элементов выбрано",
                "showMonthAfterYear": false,
                "startsWith": "Начинается с",
                "strong": "Хороший",
                "today": "Сегодня",
                "upload": "Загрузить",
                "weak": "Простой",
                "weekHeader": "Нед.",
                "aria": {
                    "cancelEdit": "Отменить правку",
                    "close": "Закрыть",
                    "collapseRow": "Свернуть строку",
                    "editRow": "Редактировать строку",
                    "expandRow": "Развернуть строку",
                    "falseLabel": "Неверно",
                    "filterConstraint": "Ограничение фильтра",
                    "filterOperator": "Оператор фильтра",
                    "firstPageLabel": "Первая страница",
                    "gridView": "В виде сетки",
                    "hideFilterMenu": "Скрыть меню фильтра",
                    "jumpToPageDropdownLabel": "Перейти к раскрывающемуся списку страниц",
                    "jumpToPageInputLabel": "Перейти к вводу страницы",
                    "lastPageLabel": "Последняя страница",
                    "listLabel": "Список опций",
                    "listView": "В виде списка",
                    "moveAllToSource": "Переместить всё в источник",
                    "moveAllToTarget": "Переместить всё в приёмник",
                    "moveBottom": "Переместить в конец",
                    "moveDown": "Переместить вниз",
                    "moveTop": "Переместить в начало",
                    "moveToSource": "Переместить в источник",
                    "moveToTarget": "Переместить в приёмник",
                    "moveUp": "Переместить вверх",
                    "navigation": "Навигация",
                    "next": "Следующий",
                    "nextPageLabel": "Следующая страница",
                    "nullLabel": "Не выбран",
                    "pageLabel": "{page}",
                    "previous": "Предыдущий",
                    "prevPageLabel": "Предыдущая страница",
                    "rotateLeft": "Повернуть влево",
                    "rotateRight": "Повернуть вправо",
                    "rowsPerPageLabel": "Строк на странице",
                    "saveEdit": "Сохранить правку",
                    "scrollTop": "Прокрутить в начало",
                    "selectAll": "Выбрать все строки",
                    "selectRow": "Выбрать строку",
                    "showFilterMenu": "Показать меню фильтра",
                    "slide": "Слайд",
                    "slideNumber": "{slideNumber}",
                    "star": "1 звезда",
                    "stars": "{star} звёзд",
                    "trueLabel": "Верно",
                    "unselectAll": "Отменить выбор всех строк",
                    "unselectRow": "Отменить выбор строки",
                    "zoomImage": "Увеличить изображение",
                    "zoomIn": "Увеличить",
                    "zoomOut": "Уменьшить"
                }
            }
        }
    },

    routeRules: {
        '/': {prerender: true},
        'ai/**': { proxy: {
                to: "http://localhost:8448/ai/**"
            }
        },
        'auth/**': { proxy: {
                to: "http://localhost:8118/auth/**"
            }
        },
        'auth-admin/**': { proxy: {
                to: "http://localhost:8118/auth-admin/**"
            }
        },
        'auth-registration/**': { proxy: {
                to: "http://localhost:8118/auth-registration/**"
            }
        },
        'business-common/**': { proxy: {
                to: "http://localhost:8448/business-common/**"
            }
        }
    },

    runtimeConfig: {
        app: {
            applicationName: 'business-ai'
        }
    },

    ssr: true
})