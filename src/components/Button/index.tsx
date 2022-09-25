import React from 'react';

import './styles.css';

interface Props {
    title?: string;
    onClick: () => void;
    size: { width: any, height: number };
    icon?: string;
    textColor?: string;
    backgroundColor?: string;
    align?: string;
    isDisabled?: boolean
}

export function Button({ title, isDisabled = false, onClick, size, icon, textColor, backgroundColor, align }: Props) {
    return (
        <button 
        style={{ 
            width: `${size.width}px`, 
            height: `${size.height}px`, 
            background: backgroundColor ? backgroundColor : '', 
            color: textColor ? textColor : '', 
            justifyContent: align ? align : '' 
        }} 
        disabled={isDisabled}
        onClick={onClick}
        >
            {
                icon &&
                <>
                    <img src={icon} alt="" />
                    <div style={{ width: 5 }} />
                </>
            }
            {title}
        </button>
    );
}