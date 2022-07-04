import styled from 'styled-components';

interface sizeProps {
    width: number;
    height: number;
}

export const Container = styled.button<{ size: sizeProps, textColor?: string, backgroundColor?: string, align?: string }>`
    background: ${props => props.backgroundColor ? props.backgroundColor : 'var(--purple)'};
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    border-radius: 12px;
    border: 0;
    :hover {
        background: ${props => props.backgroundColor ? props.backgroundColor : 'var(--purple_dark)'};
    }
    font-size: 16px;
    color: ${props => props.textColor ? props.textColor : 'var(--white)'};
    display: flex;
    align-items: center;
    justify-content: ${props => props.align ? props.align : 'center'};
`;