// Libs
import React, { useEffect } from 'react';
import { Button } from '../Button';
import Image from '../../assets/new_topic.png';
import ReplyImage from '../../assets/reply.png';
import TrashImage from '../../assets/trash.png';
import PencilImage from '../../assets/pencil.png';
import { handleData } from '../../utils/formatDate';
// Styles
import {
    Container,
    Header,
    Title,
    Comment,
    CommentHeaderInfo,
    ProfileImage,
    DateText,
    ProfileName,
    CommentText,
    Separator,
    Reply,
    ReplyText,
    CommentHeader,
    ButtonArea,
    EditButtonArea
} from './styles';
import api from '../../api/api';

interface Props {
    id?: string;
}

// Renderer
export function Forum({ id }: Props) {
    const [isEditReply, setIsEditReply] = React.useState(-1);
    const [isCommentReply, setIsCommentReply] = React.useState(-1);
    const [editText, setEditText] = React.useState("");
    const [isReply, setIsReply] = React.useState(false);
    const [commentReply, setCommentReply] = React.useState("");
    const [newTopic, setNewTopic] = React.useState(false);
    const [comments, setComments] = React.useState([] as any);
    const [users, setUsers] = React.useState([] as any);
    const [user, setUser] = React.useState({} as any);
    const [isPublished, setIsPublished] = React.useState(false);
    const bottomRef = React.useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        api.get('/usuarios/getAll').then(res => {
            setUsers(res.data);
        });
        const storage = localStorage.getItem("user");
        if (storage) {
            const user = JSON.parse(storage);
            setUser(user);
        }
    }, [])


    useEffect(() => {
        async function fetchComments() {
            await api.get(`/turmas/${id}/getComments`).then(res => {
                setComments(res.data);
            });
        }

        fetchComments();
    }, [id, comments])

    function handleEditReply(index: number) {
        setIsEditReply(index);
    }
    function handleEditText(text: string, commentID: string, parentID?: string, isReply?: boolean) {
        api.patch("/turmas/editComment", {
            text: text,
            commentId: commentID,
            ...(parentID && { parentCommentId: parentID }),
            ...(isReply && { isReply: true })
        })
    }
    function handleDelete(commentID: string, classID?: string, parentID?: string, isReply?: boolean) {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            api.delete(`/turmas/${classID}/deleteComment`, {
                data: {
                    commentId: commentID,
                    ...(parentID && { parentCommentId: parentID }),
                    ...(isReply && { isReply: true })
                }
            })
        }
    }

    function handleReply(commentID: string, userID: string, text: string) {
        api.post("/turmas/replyComment", {
            commentId: commentID,
            userId: userID,
            text: text
        })
        setEditText("")
    }
    function handleNewTopic(text: string, userID: string, classID?: string) {
        api.post(`/turmas/${classID}/commentForum`, {
            text: text,
            userId: userID
        })
        setEditText("")
        setNewTopic(false);
    }
    function scrollToBottom() {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <Container>
            <Header>
                <Title>
                    Fórum
                </Title>
                <Button onClick={() => { setNewTopic(true); scrollToBottom() }} size={{ width: 141, height: 28 }} title={"Novo tópico"} icon={Image} textColor={'#FFFFFF'} />
            </Header>
            <Separator />
            {
                comments.map((comment: any, index: any) => (
                    <div key={index}>
                        <Comment key={index}>
                            <CommentHeader>
                                <CommentHeaderInfo>
                                    <ProfileImage src={users.find((element: { _id: any; }) => element._id === comment.userId)?.photo} />
                                    <ProfileName>
                                        {users.find((element: { _id: any; }) => element._id === comment.userId)?.nome}
                                    </ProfileName>
                                    <DateText>
                                        {handleData(comment.createdAt)}
                                    </DateText>
                                </CommentHeaderInfo>
                                {
                                    isCommentReply === index ?
                                        <Button title={"Deletar"} onClick={() => { handleDelete(comment._id, id) }} size={{ width: 144, height: 28 }} icon={TrashImage} textColor={'#FB6262'} backgroundColor={'none'} align={'flex-end'} />
                                        :
                                        comment.userId === user._id &&
                                        <ButtonArea>
                                            <Button title={"Editar"} onClick={() => { setEditText(comment.text); setIsCommentReply(index); }} size={{ width: 120, height: 28 }} icon={PencilImage} textColor={'#5357B6'} backgroundColor={'none'} align={'flex-end'} />
                                            <Button title={"Responder"} onClick={() => { setIsReply(true); setCommentReply(comment._id); }} size={{ width: 120, height: 28 }} icon={ReplyImage} textColor={'#5357B6'} backgroundColor={'none'} align={'flex-end'} />
                                        </ButtonArea>
                                }
                            </CommentHeader>
                            {
                                isCommentReply === index ?
                                    <>
                                        <Separator />
                                        <ReplyText onChange={(e: any) => { setEditText(e.target.value) }}>
                                            {editText}
                                        </ReplyText>
                                    </>
                                    :
                                    <CommentText>
                                        {comment.text}
                                    </CommentText>
                            }
                            <Separator />
                            {
                                isCommentReply === index &&
                                <EditButtonArea>
                                    <Button title={"Editar"} size={{ width: 121, height: 48 }} onClick={() => { handleEditText(editText, comment._id); setIsCommentReply(-1); setEditText("") }} />
                                </EditButtonArea>
                            }
                        </Comment>
                        <Separator />
                        {
                            comment.replies?.map((reply: any, index: number) => (
                                <div key={index}>
                                    <Reply>
                                        <CommentHeader>
                                            <CommentHeaderInfo>
                                                <ProfileImage src={reply.userId === user._id ? user.photo : users.find((element: { _id: any; }) => element._id === comment.userId)?.photo} />
                                                <ProfileName>
                                                    {users.find((element: { _id: any; }) => element._id === reply.userId)?.nome}
                                                </ProfileName>
                                                <DateText>
                                                    {handleData(reply.createdAt)}
                                                </DateText>
                                            </CommentHeaderInfo>
                                            {
                                                isEditReply === index ?
                                                    <Button title={"Deletar"} onClick={() => { handleDelete(reply._id, id, comment._id, true) }} size={{ width: 144, height: 28 }} icon={TrashImage} textColor={'#FB6262'} backgroundColor={'none'} align={'flex-end'} />
                                                    :
                                                    reply.userId === user._id &&
                                                    <ButtonArea>
                                                        <Button title={"Editar"} onClick={() => { handleEditReply(index); setEditText(reply.text) }} size={{ width: 120, height: 28 }} icon={PencilImage} textColor={'#5357B6'} backgroundColor={'none'} align={'flex-end'} />
                                                    </ButtonArea>
                                            }
                                        </CommentHeader>
                                        {
                                            isEditReply === index ?
                                                <>
                                                    <Separator />
                                                    <ReplyText onChange={(e: any) => { setEditText(e.target.value) }} placeholder={"Escreva sua resposta"} value={editText}>
                                                        {editText}
                                                    </ReplyText>
                                                </>
                                                :
                                                <CommentText>
                                                    {reply.text}
                                                </CommentText>
                                        }
                                        <Separator />
                                        {
                                            isEditReply === index &&
                                            <EditButtonArea>
                                                <Button title={"Editar"} size={{ width: 121, height: 48 }} onClick={() => { handleEditText(editText, reply._id, comment._id, true); handleEditReply(-1); setEditText("") }} />
                                            </EditButtonArea>
                                        }
                                    </Reply>
                                    <Separator />
                                </div>
                            ))
                        }
                        {
                            isReply && commentReply === comment._id && (
                                <>
                                    <Reply>
                                        <CommentHeader>
                                            <CommentHeaderInfo>
                                                <ProfileImage src={user.photo} />
                                                <ProfileName>
                                                    {user.nome}
                                                </ProfileName>
                                            </CommentHeaderInfo>
                                        </CommentHeader>
                                        {
                                            <>
                                                <Separator />
                                                <ReplyText onChange={(e: any) => { setEditText(e.target.value) }} placeholder={"Escreva sua resposta"} value={editText}>
                                                    {editText}
                                                </ReplyText>
                                            </>
                                        }
                                        <Separator />
                                        <EditButtonArea>
                                            <Button title={"Responder"} size={{ width: 121, height: 48 }} onClick={() => { handleReply(commentReply, user._id, editText); setIsReply(false); }} />
                                        </EditButtonArea>
                                    </Reply>
                                    <Separator />

                                </>
                            )
                        }
                    </div>
                ))
            }
            {
                newTopic && (
                    <Comment>
                        <CommentHeader>
                            <CommentHeaderInfo>
                                <ProfileImage src={user.photo} />
                                <ProfileName>
                                    {user.nome}
                                </ProfileName>
                            </CommentHeaderInfo>
                        </CommentHeader>
                        {
                            <>
                                <Separator />
                                <ReplyText onChange={(e: any) => { setEditText(e.target.value) }} placeholder={"Escreva sua resposta"} value={editText}>
                                    {editText}
                                </ReplyText>
                            </>
                        }
                        <Separator />
                        <EditButtonArea>
                            <Button title={"Publicar"} size={{ width: 121, height: 48 }} onClick={() => { handleNewTopic(editText, user._id, id); setIsPublished(state => !state); }} />
                        </EditButtonArea>
                        <div ref={bottomRef} />
                    </Comment>
                )
            }
        </Container>
    );
}