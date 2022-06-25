// Libs
import React from 'react';

// Styles
import { Container } from './styles';

// Types
interface Props {
    title?: string;
    onClick: () => void;
}

// Renderer
export function TextButton({ title, onClick }: Props) {
    return (
        <Container onClick={onClick}>
            {title}
        </Container>
    );
}