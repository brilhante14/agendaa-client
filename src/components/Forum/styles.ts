import styled from 'styled-components';

// Remover essa linha, o estilo será provido pelo pai
export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 24px;
    font-weight: medium;        
`;

export const Comment = styled.div`
    width: 100%;
    background: var(--purple_light);
    padding: 24px;
    border-radius: 8px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
`;
export const CommentHeaderInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const ProfileName = styled.p`
    margin-left: 10px;
    color: #334253;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
`;

export const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;
export const DateText = styled.p`
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #67727E;
`;

export const CommentText = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #67727E;
    margin-left: 45px;
    text-align: justify;
`;

export const Separator = styled.div`
    height: 10px;
`;

export const Reply = styled.div`
    background: var(--purple_light);
    padding: 24px;
    border-radius: 8px;
    margin-left: 40px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
`;

export const ReplyText = styled.textarea`
    line-height: 16px;
    color: #67727E;
    width: 100%;
    height: 150px;
    background: var(--purple_light);
    border: 1px solid #5357B6;
    border-radius: 8px;
    padding: 10px;
    resize: none;
`;

export const CommentHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
`;

export const EditButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
`;