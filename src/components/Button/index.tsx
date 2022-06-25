// Libs
import React from 'react';

// Styles
import { Container } from './styles';

// Types
interface Props {
    title?: string;
    onClick: () => void;
    size: { width: number, height: number };
}

// Renderer
export function Button({ title, onClick, size }: Props) {
    return (
        <Container onClick={onClick} size={size}>
            {title}
        </Container>
    );
}