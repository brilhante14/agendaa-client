import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.p`
    font-size: 18px;
`;

export const Input = styled.input`
    border-radius: 12px;
    border: 1px solid var(--purple);
    background: none;
    height: 50px;
    min-width: 400px;
    padding: 10px;
    margin-top: 10px;
    ::placeholder {
        font-size: 16px;
    }
`;