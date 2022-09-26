// Libs
import React, { useEffect } from "react";
import { Button } from "../Button";
import Image from "../../assets/new_topic.png";
import ReplyImage from "../../assets/reply.png";
import TrashImage from "../../assets/trash.png";
import PencilImage from "../../assets/pencil.png";
import ForumVazio from "../../assets/forum_vazio.png";
import { handleDate } from "../../utils/formatDate";
import { useForum } from '../../services/useForum';
import api from "../../api/api";
import { CreateTopic } from "./CreateTopic"
import { Comment } from "./Comment"

import "./styles.css";
interface Props {
  id?: string;
}

export interface CommentType {
  _id: string;
  createdAt: Date;
  text: string;
  userId: string;
}

interface TopLevelComment extends CommentType {
  replies: Array<CommentType>;
}

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
    if (id) {
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
    parentID?: string,
    isReply?: boolean
  ) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      api
        .delete(`/turmas/${id}/deleteComment`, {
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

  const handlePublish = (text: string, userId: string) => {
    handleNewTopic(text, userId, id);
    setNewTopic(false);
  }

  const handlePublishReply = (text: string, userId: string, commentId: string = "") => {
    handleReply(commentId, userId, text);
    setIsReply(false); 
  }

  const setCommentEdit = (commentId: string) => {
    // setIsEditReply(commentId);
    setIsCommentReply(commentId);
  }
  // const handleCommentDelete = () => {}
  // const handleCommentDelete = () => {}


  if(comments.length <= 0 && !newTopic)
    return (
      <div className="commentsEmptyForum">
        <img src={ForumVazio} alt="" />
        <h3>Fórum Vazio! Crie uma postagem acima</h3>
      </div>
    );

  return (
    <div className="commentsContainer">
      <div className="commentsHeader">
        <h2 className="commentsTitle">Fórum</h2>
        <Button
          onClick={() => {
            setNewTopic(true);
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
          }}
          size={{ width: 141, height: 28 }}
          title={"Novo tópico"}
          icon={Image}
          textColor={"#FFFFFF"}
        />
      </div>
      <div className="commentsSeparator" />
      {comments.length > 0 &&
        comments.map(comment => {
          const commentUser = users.find((u) => u._id === comment.userId);
          return (
            <div key={comment._id}>
              {/* <div className="commentsComment">
                <div className="commentsHeader">
                  <div className="commentsHeaderInfo">
                    <img className="commentsProfileImage" alt="User profile" src={commentUser?.photo} />
                    <p className="commentsProfileName">{commentUser?.nome}</p>
                    <p className="commentsDateText">{handleDate(comment.createdAt)}</p>
                  </div>

                  {isCommentReply === comment._id ? (
                    <Button
                      title={"Deletar"}
                      onClick={() => {
                        handleDelete(comment._id);
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

                    <textarea className="commentReplyText" onChange={e => setEditText(e.target.value)}>
                      {editText}
                    </textarea>

                    <div className="commentsSeparator" />

                    <div className="commentEditButtonArea">
                      <Button
                        isDisabled={!editText}
                        title={"Editar"}
                        size={{ width: 121, height: 28 }}
                        onClick={() => {
                          handleEditText(editText, comment._id);
                          setIsCommentReply("");
                          setEditText("");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="commmentText">{comment.text}</p>
                )}
              </div> */}

              <Comment 
                comment={comment} 
                commentUser={commentUser} 
                isAuthor={comment.userId === user._id} 
                handleDelete={handleDelete}  
                handleEdit={() => {}}  
                handleReply={() => {}}  
                setEdit={setCommentEdit}  
                isEditing={isCommentReply === comment._id}
              />

              <div className="commentsSeparator" />

              {comment.replies?.map(reply => {
                const replyUser = users.find((u) => u._id === reply.userId);
                return(
                <div key={reply._id}>
                  {/* <div className="commentReply">
                    <div className="commentsHeader">
                      <div className="commentsHeaderInfo">
                        <img className="commentsProfileImage" alt="User profile" src={replyUser?.photo} />
                        <p className="commentsProfileName">{replyUser?.nome}</p>
                        <p className="commentsDateText">{handleDate(reply.createdAt)}</p>
                      </div>

                      {isEditReply === reply._id ? (
                        <Button
                          title={"Deletar"}
                          onClick={() => {
                            handleDelete(reply._id, comment._id, true);
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
                          onChange={e => setEditText(e.target.value)}
                          value={editText}
                          placeholder={"Escreva sua resposta"}
                          >
                          {editText}
                        </textarea>
                        <div className="commentsSeparator" />
                        <div className="commentEditButtonArea">
                        <Button
                          title={"Editar"}
                          isDisabled={!editText}
                          size={{ width: 121, height: 28 }}
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

                      </>
                    ) : (
                      <p className="commmentText">{reply.text}</p>
                    )}
                    <div className="commentsSeparator" />
                  </div> */}
                  <Comment 
                    comment={reply} 
                    commentUser={replyUser} 
                    isAuthor={reply.userId === user._id} 
                    handleDelete={handleDelete}  
                    handleEdit={() => {}}  
                    handleReply={() => {}}  
                    setEdit={setCommentEdit}  
                    isEditing={isCommentReply === reply._id}
                    isReply
                  />
                  <div className="commentsSeparator" />

                </div>
              )})}


              {isReply && commentReply === comment._id && (
                <CreateTopic comment={comment} title="Responder" commentUser={user} handlePublish={handlePublishReply} isReply />
              )}
            </div>
          )
        })}

      {newTopic && 
      <>
        <CreateTopic title="Publicar" handlePublish={handlePublish} commentUser={user} />
        <div ref={bottomRef} />
      </>
      }
    </div>
  );
}
