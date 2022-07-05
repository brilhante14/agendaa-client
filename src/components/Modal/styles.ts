import styled from 'styled-components';

export const ModalHandler = styled.div`
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    background-color: var(--purple_light);
    box-shadow: 0px 2px 5px #00000014;
    padding: 30px;
    border-radius: 8px;
`;

export const CloseButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Button = styled.button`
    border: none;
    background-color: var(--purple);
    color: var(--white);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;