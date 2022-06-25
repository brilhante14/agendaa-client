import styled from 'styled-components';

interface sizeProps {
    width: number;
    height: number;
}

export const Container = styled.button<{ size: sizeProps }>`
    background: var(--purple);
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    border-radius: 12px;
    border: 0;
    :hover {
        background: var(--purple_dark);
    }
    font-size: 16px;
    color: var(--white);
`;