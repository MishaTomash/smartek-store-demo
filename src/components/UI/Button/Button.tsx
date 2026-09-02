import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export const Button = ({children, onClick, className}: ButtonProps) => {
    return (
        <button className={`${className || styles.defaultButton} `} onClick={onClick}>
            {children}
        </button>
    )
}