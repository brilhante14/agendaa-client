// Libs
import React, { useEffect } from "react";
import { Button } from "../Button";
import Image from "../../assets/new_topic.png";
import ReplyImage from "../../assets/reply.png";
import TrashImage from "../../assets/trash.png";
import PencilImage from "../../assets/pencil.png";
import ForumVazio from "../../assets/forum_vazio.png";
import { handleData } from "../../utils/formatDate";
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
  EditButtonArea,
  EmptyForum,
} from "./styles";
import api from "../../api/api";

interface Props {
  id?: string;
}

interface CommentType {
  _id: string;
  createdAt: Date;
  text: string;
  userId: string;
}

interface TopLevelComment extends CommentType {
  replies: Array<CommentType>;
}

async function fetchComments(id: string) {
  return await api.get(`/turmas/${id}/getComments`);
}

// Renderer
export function Forum({ id }: Props) {
  const [isEditReply, setIsEditReply] = React.useState("");
  const [isCommentReply, setIsCommentReply] = React.useState("");
  const [editText, setEditText] = React.useState("");
  const [isReply, setIsReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState("");
  const [newTopic, setNewTopic] = React.useState(false);
  const [comments, setComments] = React.useState<Array<TopLevelComment>>([]);
  const [users, setUsers] = React.useState<
    Array<{ _id: string; photo: string; nome: string }>
  >([]);
  const [user, setUser] = React.useState({} as any);

  const bottomRef = React.useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    api.get("/usuarios/getAll").then((res) => {
      setUsers(res.data);
    });
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (id) fetchComments(id).then((res) => setComments(res.data));
  }, [id]);

  function handleEditText(
    text: string,
    commentID: string,
    parentID?: string,
    isReply?: boolean
  ) {
    api
      .patch("/turmas/editComment", {
        text: text,
        commentId: commentID,
        ...(parentID && { parentCommentId: parentID }),
        ...(isReply && { isReply: true }),
      })
      .then(() => {
        if (!isReply) {
          setComments(
            comments.map((comment) => {
              if (comment._id === commentID) {
                return { ...comment, text: text };
              }
              return comment;
            })
          );
        } else {
          setComments(
            comments.map((comment) => {
              if (comment._id === parentID) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply._id === commentID) {
                      return { ...reply, text: text };
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            })
          );
        }
      });
  }
  function handleDelete(
    commentID: string,
    classID?: string,
    parentID?: string,
    isReply?: boolean
  ) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      api
        .delete(`/turmas/${classID}/deleteComment`, {
          data: {
            commentId: commentID,
            ...(parentID && { parentCommentId: parentID }),
            ...(isReply && { isReply: true }),
          },
        })
        .then(() => {
          if (!isReply) {
            setComments(comments.filter((c) => c._id !== commentID));
          } else if (parentID) {
            setComments(
              comments.map((comment) => {
                if (comment._id === parentID) {
                  return {
                    ...comment,
                    replies: comment.replies.filter((c) => c._id !== commentID),
                  };
                }
                return comment;
              })
            );
          }
        });
      setEditText("");
      setIsEditReply("");
      setIsCommentReply("");
    }
  }

  function handleReply(commentID: string, userID: string, text: string) {
    api
      .post("/turmas/replyComment", {
        commentId: commentID,
        userId: userID,
        text: text,
      })
      .then((res) => {
        setComments(
          comments.map((comment) => {
            if (comment._id === commentID) {
              return {
                ...comment,
                replies: comment.replies.concat([
                  {
                    _id: res.data.reply_id,
                    createdAt: new Date(),
                    text: text,
                    userId: userID,
                  },
                ]),
              };
            }
            return comment;
          })
        );
      });
    setEditText("");
  }
  function handleNewTopic(text: string, userID: string, classID?: string) {
    api
      .post(`/turmas/${classID}/commentForum`, {
        text: text,
        userId: userID,
      })
      .then((res) => {
        setComments(
          comments.concat([
            {
              userId: userID,
              replies: [],
              _id: res.data.comment_id,
              createdAt: new Date(),
              text: text,
            },
          ])
        );
      });
    setEditText("");
    setNewTopic(false);
  }
  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Container>
      <Header>
        <Title>Fórum</Title>
        <Button
          onClick={() => {
            setNewTopic(true);
            scrollToBottom();
          }}
          size={{ width: 141, height: 28 }}
          title={"Novo tópico"}
          icon={Image}
          textColor={"#FFFFFF"}
        />
      </Header>
      <Separator />
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id}>
            <Comment>
              <CommentHeader>
                <CommentHeaderInfo>
                  <ProfileImage
                    src={users.find((u) => u._id === comment.userId)?.photo}
                  />
                  <ProfileName>
                    {users.find((u) => u._id === comment.userId)?.nome}
                  </ProfileName>
                  <DateText>{handleData(comment.createdAt)}</DateText>
                </CommentHeaderInfo>
                {isCommentReply === comment._id ? (
                  <Button
                    title={"Deletar"}
                    onClick={() => {
                      handleDelete(comment._id, id);
                    }}
                    size={{ width: 144, height: 28 }}
                    icon={TrashImage}
                    textColor={"#FB6262"}
                    backgroundColor={"none"}
                    align={"flex-end"}
                  />
                ) : (
                  <ButtonArea>
                    {comment.userId === user._id && (
                      <Button
                        title={"Editar"}
                        onClick={() => {
                          setEditText(comment.text);
                          setIsCommentReply(comment._id);
                        }}
                        size={{ width: 120, height: 28 }}
                        icon={PencilImage}
                        textColor={"#5357B6"}
                        backgroundColor={"none"}
                        align={"flex-end"}
                      />
                    )}
                    <Button
                      title={"Responder"}
                      onClick={() => {
                        setIsReply(true);
                        setCommentReply(comment._id);
                      }}
                      size={{ width: 120, height: 28 }}
                      icon={ReplyImage}
                      textColor={"#5357B6"}
                      backgroundColor={"none"}
                      align={"flex-end"}
                    />
                  </ButtonArea>
                )}
              </CommentHeader>
              {isCommentReply === comment._id ? (
                <>
                  <Separator />
                  <ReplyText
                    onChange={(e: any) => {
                      setEditText(e.target.value);
                    }}
                  >
                    {editText}
                  </ReplyText>
                </>
              ) : (
                <CommentText>{comment.text}</CommentText>
              )}
              <Separator />
              {isCommentReply === comment._id && (
                <EditButtonArea>
                  <Button
                    title={"Editar"}
                    size={{ width: 121, height: 48 }}
                    onClick={() => {
                      handleEditText(editText, comment._id);
                      setIsCommentReply("");
                      setEditText("");
                    }}
                  />
                </EditButtonArea>
              )}
            </Comment>
            <Separator />
            {comment.replies?.map((reply, index) => (
              <div key={reply._id}>
                <Reply>
                  <CommentHeader>
                    <CommentHeaderInfo>
                      <ProfileImage
                        src={
                          reply.userId === user._id
                            ? user.photo
                            : users.find((u) => u._id === comment.userId)?.photo
                        }
                      />
                      <ProfileName>
                        {users.find((u) => u._id === reply.userId)?.nome}
                      </ProfileName>
                      <DateText>{handleData(reply.createdAt)}</DateText>
                    </CommentHeaderInfo>
                    {isEditReply === reply._id ? (
                      <Button
                        title={"Deletar"}
                        onClick={() => {
                          handleDelete(reply._id, id, comment._id, true);
                        }}
                        size={{ width: 144, height: 28 }}
                        icon={TrashImage}
                        textColor={"#FB6262"}
                        backgroundColor={"none"}
                        align={"flex-end"}
                      />
                    ) : (
                      reply.userId === user._id && (
                        <ButtonArea>
                          <Button
                            title={"Editar"}
                            onClick={() => {
                              setIsEditReply(reply._id);
                              setEditText(reply.text);
                            }}
                            size={{ width: 120, height: 28 }}
                            icon={PencilImage}
                            textColor={"#5357B6"}
                            backgroundColor={"none"}
                            align={"flex-end"}
                          />
                        </ButtonArea>
                      )
                    )}
                  </CommentHeader>
                  {isEditReply === reply._id ? (
                    <>
                      <Separator />
                      <ReplyText
                        onChange={(e: any) => {
                          setEditText(e.target.value);
                        }}
                        placeholder={"Escreva sua resposta"}
                        value={editText}
                      >
                        {editText}
                      </ReplyText>
                    </>
                  ) : (
                    <CommentText>{reply.text}</CommentText>
                  )}
                  <Separator />
                  {isEditReply === reply._id && (
                    <EditButtonArea>
                      <Button
                        title={"Editar"}
                        size={{ width: 121, height: 48 }}
                        onClick={() => {
                          handleEditText(
                            editText,
                            reply._id,
                            comment._id,
                            true
                          );
                          setIsEditReply("");
                          setEditText("");
                        }}
                      />
                    </EditButtonArea>
                  )}
                </Reply>
                <Separator />
              </div>
            ))}
            {isReply && commentReply === comment._id && (
              <>
                <Reply>
                  <CommentHeader>
                    <CommentHeaderInfo>
                      <ProfileImage src={user.photo} />
                      <ProfileName>{user.nome}</ProfileName>
                    </CommentHeaderInfo>
                  </CommentHeader>
                  {
                    <>
                      <Separator />
                      <ReplyText
                        onChange={(e: any) => {
                          setEditText(e.target.value);
                        }}
                        placeholder={"Escreva sua resposta"}
                        value={editText}
                      >
                        {editText}
                      </ReplyText>
                    </>
                  }
                  <Separator />
                  <EditButtonArea>
                    <Button
                      title={"Responder"}
                      size={{ width: 121, height: 48 }}
                      onClick={() => {
                        handleReply(commentReply, user._id, editText);
                        setIsReply(false);
                      }}
                    />
                  </EditButtonArea>
                </Reply>
                <Separator />
              </>
            )}
          </div>
        ))}
      {newTopic && (
        <Comment>
          <CommentHeader>
            <CommentHeaderInfo>
              <ProfileImage src={user.photo} />
              <ProfileName>{user.nome}</ProfileName>
            </CommentHeaderInfo>
          </CommentHeader>
          {
            <>
              <Separator />
              <ReplyText
                onChange={(e: any) => {
                  setEditText(e.target.value);
                }}
                placeholder={"Escreva sua resposta"}
                value={editText}
              >
                {editText}
              </ReplyText>
            </>
          }
          <Separator />
          <EditButtonArea>
            <Button
              title={"Publicar"}
              size={{ width: 121, height: 48 }}
              onClick={() => {
                handleNewTopic(editText, user._id, id);
                setNewTopic(false);
                setEditText("");
              }}
            />
          </EditButtonArea>
          <div ref={bottomRef} />
        </Comment>
      )}
      {comments.length <= 0 && !newTopic && (
        <EmptyForum>
          <img src={ForumVazio} alt="" />
          <h3>Fórum Vazio! Crie uma postagem acima</h3>
        </EmptyForum>
      )}
    </Container>
  );
}
