import styles from "@/styles/modules/page.module.scss";

interface IntroWrapperProps {
    children: React.ReactNode;
}

export const IntroWrapper = ({ children }: IntroWrapperProps) => {

    return (
        <div className={styles.main__intro_wrapper}>
            {children}
        </div>
    )
};