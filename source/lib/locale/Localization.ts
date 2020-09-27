import { LocalizationElements } from '../common/api/LocalizationElements';
import localeList from './LocaleList';

export type LocaleSource = { [locale: string]: LocalizationElements };

const localization: LocaleSource = {
    [localeList.plPL]: {
        days: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
        daysShort: ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
        months: [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień',
        ],
        monthsShort: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
        today: 'Dzisiaj',
        noEventsForThisDay: 'Na ten dzień nie ma zaplanowanych wydarzeń.',
    },
};

export default localization;
