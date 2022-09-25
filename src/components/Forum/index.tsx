// Libs
import React, { useEffect } from "react";
import { Button } from "../Button";
import Image from "../../assets/new_topic.png";
import ReplyImage from "../../assets/reply.png";
import TrashImage from "../../assets/trash.png";
import PencilImage from "../../assets/pencil.png";
import ForumVazio from "../../assets/forum_vazio.png";
import { handleData } from "../../utils/formatDate";
import { useForum } from '../../services/useForum';
import api from "../../api/api";

import "./styles.css";
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

// Renderer
export function Forum({ id }: Props) {
  const [isEditReply, setIsEditReply] = React.useState("");
  const [isCommentReply, setIsCommentReply] = React.useState("");
  const [editText, setEditText] = React.useState("");
  const [isReply, setIsReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState("");
  const [newTopic, setNewTopic] = React.useState(false);
  const [comments, setComments] = React.useState<TopLevelComment[]>([]);
  const [users, setUsers] = React.useState<
    Array<{ _id: string; photo: string; nome: string }>
  >([]);
  const [user, setUser] = React.useState({} as any);
  const useForumService = useForum()

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
    if(id){
      const comments = useForumService.getComments(id);
      // setComments(comments);
    }
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

  return (
    <div className="commentsContainer">
      <div className="commentsHeader">
        <div className="commentsTitle">Fórum</div>
        <Button
          onClick={() => {
            setNewTopic(true);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          size={{ width: 141, height: 28 }}
          title={"Novo tópico"}
          icon={Image}
          textColor={"#FFFFFF"}
        />
      </div>
      <div className="commentsSeparator" />
      {comments.length > 0 &&
        comments.map((comment) => (

          <div key={comment._id}>
            <div className="commentsComment">
              <div className="commentHeader">
                <div className="commentsHeaderInfo">
                  <img className="commentsProfileImage"
                    src={users.find((u) => u._id === comment.userId)?.photo}
                  />
                  <p className="commentsProfileName">
                    {users.find((u) => u._id === comment.userId)?.nome}
                  </p>
                  <p className="commentsDateText">{handleData(comment.createdAt)}</p>
                </div>
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
                  <div className="commentsButtonArea">
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
                  </div>
                )}
              </div>
              {isCommentReply === comment._id ? (
                <>
                  <div className="commentsSeparator" />
                  <textarea className="commentReplyText"
                    onChange={(e: any) => {
                      setEditText(e.target.value);
                    }}
                  >
                    {editText}
                  </textarea>
                </>
              ) : (
                <p className="commmentText">{comment.text}</p>
              )}
              <div className="commentsSeparator" />

              {isCommentReply === comment._id && (
                <div className="commentEditButtonArea">
                  <Button
                    title={"Editar"}
                    size={{ width: 121, height: 48 }}
                    onClick={() => {
                      handleEditText(editText, comment._id);
                      setIsCommentReply("");
                      setEditText("");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="commentsSeparator" />

            {comment.replies?.map((reply, index) => (
              <div key={reply._id}>
                <div className="commentReply">
                  <div className="commentHeader">
                    <div className="commentsHeaderInfo">

                    <img className="commentsProfileImage"
                      src={
                          reply.userId === user._id
                            ? user.photo
                            : users.find((u) => u._id === comment.userId)?.photo
                        }
                      />
                      <p className="commentsProfileName">

                        {users.find((u) => u._id === reply.userId)?.nome}
                      </p>
                  <p className="commentsDateText">{handleData(reply.createdAt)}</p>
                    </div>
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
                        <div className="commentsButtonArea">
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
                        </div>
                      )
                    )}
                  </div>
                  {isEditReply === reply._id ? (
                    <>
                      <div className="commentsSeparator" />

                      <textarea className="commentReplyText"
                        onChange={(e: any) => {
                          setEditText(e.target.value);
                        }}
                        placeholder={"Escreva sua resposta"}
                        value={editText}
                      >
                        {editText}
                      </textarea>
                    </>
                  ) : (
                   <p className="commmentText">{reply.text}</p>
                  )}
                        <div className="commentsSeparator" />

                  {isEditReply === reply._id && (
                    <div className="commentEditButtonArea">
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
                    </div>
                  )}
                </div>
                <div className="commentsSeparator" />

              </div>
            ))}
            {isReply && commentReply === comment._id && (
              <>
                <div className="commentReply">
                  <div className="commentHeader">
                    <div className="commentsHeaderInfo">

                  <img className="commentsProfileImage"
                      src={user.photo} />
                      <p className="commentsProfileName">
{user.nome}</p>
                    </div>
                  </div>
                  {
                    <>
                      <div className="commentsSeparator" />

                      <textarea className="commentReplyText"
                        onChange={(e: any) => {
                          setEditText(e.target.value);
                        }}
                        placeholder={"Escreva sua resposta"}
                        value={editText}
                      >
                        {editText}
                      </textarea>
                    </>
                  }
                        <div className="commentsSeparator" />

                  <div className="commentEditButtonArea">
                    <Button
                      title={"Responder"}
                      size={{ width: 121, height: 48 }}
                      onClick={() => {
                        handleReply(commentReply, user._id, editText);
                        setIsReply(false);
                      }}
                    />
                  </div>
                </div>
                      <div className="commentsSeparator" />

              </>
            )}
          </div>
        ))}
      {newTopic && (
        <div className="commentsComment">
          <div className="commentHeader">
            <div className="commentsHeaderInfo">

            <img className="commentsProfileImage" src={user.photo} />
              <p className="commentsProfileName">
{user.nome}</p>
            </div>
          </div>
          {
            <>
                    <div className="commentsSeparator" />

              <textarea className="commentReplyText"
                onChange={(e: any) => {
                  setEditText(e.target.value);
                }}
                placeholder={"Escreva sua resposta"}
                value={editText}
              >
                {editText}
              </textarea>
            </>
          }
                <div className="commentsSeparator" />

          <div className="commentEditButtonArea">
            <Button
              title={"Publicar"}
              size={{ width: 121, height: 48 }}
              onClick={() => {
                handleNewTopic(editText, user._id, id);
                setNewTopic(false);
                setEditText("");
              }}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      )}
      {comments.length <= 0 && !newTopic && (
        <div className="commentsEmptyForum">
          <img src={ForumVazio} alt="" />
          <h3>Fórum Vazio! Crie uma postagem acima</h3>
        </div>
      )}
    </div>
  );
}
