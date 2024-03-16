import styles from "@/styles/modules/footer.module.scss";
import { BtnWithTextCopy } from "./shared/BtnWithTextCopy";
import { TextWithCopy } from "./shared/TextWithCopy";
import SvgBackground from "./SvgBackground";

type OptionData = {
    text: string;
    // check if need animation
    isLink: boolean;
    isUpperCased?: boolean;
};
type ListData = Array<OptionData>; 

// TEXT DATA
const FIRST_LIST_DATA: ListData = [
        {
            text: '+79856402997',
            isLink: true,
        },
        {
            text: 'contact@brandmesta.ru',
            isLink: true,
            isUpperCased: true,
        },
];

const SECOND_LIST_DATA: ListData = [
    {
        text: 'Все права защищены ©2023',
        isLink: false,
    },
    {
        text: 'Политика конфиденциальности',
        isLink: true,
    },
    {
        text: 'Политика Cookie',
        isLink: true,
    },
]

const LINK_TEXT = 'Разработано Friend Lee';


// Components
export const Footer = () => {

    const firstListOptions = FIRST_LIST_DATA.map(data => (
        <FooterOptionOfList
            key={data.text}
            optionData={data}
        />
    ));
    const secondListOptions = SECOND_LIST_DATA.map(data => (
        <FooterOptionOfList
            key={data.text}
            optionData={data}
        />
    ));

    return (
        <footer className={styles.footer}>
            <SvgBackground />
            <div className={styles.footer__grid}>
                <ul className={styles.footer__list}>
                    {firstListOptions}
                </ul>
                <ul className={styles.footer__list}>
                    {secondListOptions}
                </ul>
                <a className={styles.footer__link}>
                    <TextWithCopy text={LINK_TEXT} color='dark' />
                </a>
            </div>
            <BtnWithTextCopy text="Обсудить задачу" mode="large" />
        </footer>
    )
};


// Option of list (ul)
interface FooterListProps {
    optionData: OptionData;
}

const FooterOptionOfList = ({ optionData }: FooterListProps) => {
    if (optionData.isLink) {
        return (
            <li key={optionData.text} data-option-mode='link'
                data-uppercased={optionData.isUpperCased ? true : false}
            >
                <a>
                    <TextWithCopy text={optionData.text} color='dark' />
                </a>
            </li> 
        )
    }
    
    return (
        <li key={optionData.text} data-option-mode='text'>
            <p>{optionData.text}</p>
        </li> 
    )
};