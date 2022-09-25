import React from 'react';

import './styles.css';

interface Props {
    title?: string;
    onClick: () => void;
}

export function TextButton({ title, onClick }: Props) {
    return (
        <button className='textButtonComponentContainer' onClick={onClick}>
            {title}
        </button>
    );
}