import styled from 'styled-components';

export const Container = styled.div`
    width: 430px;
`;

export const SliderContainer = styled.div`
`;

export const Title = styled.p`
    font-size: 18px;
`;

export const Separator = styled.div`
    height: 10px;
`;

export const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Day = styled.button<{ selected: boolean }>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => (props.selected ? 'var(--purple_dark)' : 'var(--purple_light)')};
    border: 1px solid var(--purple_dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.selected ? 'var(--white)' : 'var(--purple_dark)')};
`;

export const Days = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const DateContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const DateSelector = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;