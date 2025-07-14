interface GenericButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const GenericButton: React.FC<GenericButtonProps> = ({ label, onClick, className = '' }) => {
    return (
        <button onClick={onClick} className={`generic-button ${className}`}>
            {label}
        </button>
    );
}

export default GenericButton;