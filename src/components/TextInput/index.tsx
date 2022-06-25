// Libs
import React from 'react';

// Styles
import {
    Container,
    Title,
    Input
} from './styles';

// Types
interface Props {
    title?: string;
    error?: boolean;
    onChange: ((e: React.ChangeEvent<any>) => void) | (() => void);
    placeholder: string;
    value?: string;
    isSecure?: boolean;
}

// Renderer
export function TextInput({ title, error, onChange, placeholder, value, isSecure }: Props) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <Input placeholder={placeholder} onChange={onChange} value={value} {...(isSecure && { type: 'password' })} />
        </Container>
    );
}