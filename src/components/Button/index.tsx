// Libs
import React from 'react';

// Styles
import { Container } from './styles';

// Types
interface Props {
    title?: string;
    onClick: () => void;
    size: { width: number, height: number };
    icon?: string;
    textColor?: string;
    backgroundColor?: string;
    align?: string;
}

// Renderer
export function Button({ title, onClick, size, icon, textColor, backgroundColor, align }: Props) {
    return (
        <Container onClick={onClick} size={size} textColor={textColor} backgroundColor={backgroundColor} align={align}>
            {
                icon &&
                <>
                    <img src={icon} alt="" />
                    <div style={{ width: 5 }} />
                </>
            }
            {title}
        </Container>
    );
}