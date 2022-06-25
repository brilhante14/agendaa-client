import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
`;

export const FormArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ImageArea = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--purple);
`;

export const Image = styled.img``;

export const Title = styled.p`
    font-size: 22px;
    font-weight: bold;
`;