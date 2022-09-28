// Libs
import React, { useEffect } from "react";
import { Button } from "../Button";
import Image from "../../assets/new_topic.png";
import ReplyImage from "../../assets/reply.png";
import TrashImage from "../../assets/trash.png";
import PencilImage from "../../assets/pencil.png";
import ForumVazio from "../../assets/forum_vazio.png";
import { handleDate } from "../../utils/formatDate";
import { useForum } from "../../services/useForum";
import api from "../../api/api";
import { CreateTopic } from "./CreateTopic";
import { Comment } from "./Comment";

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

export interface TopLevelComment extends CommentType {
  replies: Array<CommentType>;
}

export function Forum({ id = "" }: Props) {
  const [isEditReply, setIsEditReply] = React.useState("");
  const [isCommentReply, setIsCommentReply] = React.useState("");
  const [isReply, setIsReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState("");
  const [newTopic, setNewTopic] = React.useState(false);
  const [comments, setComments] = React.useState<TopLevelComment[]>([]);
  const [users, setUsers] = React.useState<
    Array<{ _id: string; photo: string; nome: string }>
  >([]);
  const [user, setUser] = React.useState({} as any);
  const useForumService = useForum();

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
    if (id) refreshForum();
  }, [id]);

  const refreshForum = () => {
    useForumService.getComments(id).then((commentsResult) => {
      setComments(commentsResult);
    });
  };

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
        refreshForum();
        setIsCommentReply("");
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
          refreshForum();
          setIsEditReply("");
          setIsCommentReply("");
        });
    }
  }

  function handleReply(commentID: string, userID: string, text: string) {
    api
      .post("/turmas/replyComment", {
        commentId: commentID,
        userId: userID,
        text: text,
      })
      .then(() => {
        refreshForum();
      });
  }

  function handleNewTopic(text: string, userID: string, classID?: string) {
    api
      .post(`/turmas/${classID}/commentForum`, {
        text: text,
        userId: userID,
      })
      .then(() => {
        refreshForum();
        setNewTopic(false);
      });
  }

  const handlePublish = (text: string, userId: string) => {
    handleNewTopic(text, userId, id);
    setNewTopic(false);
  };

  const handlePublishReply = (
    text: string,
    userId: string,
    commentId: string = ""
  ) => {
    handleReply(commentId, userId, text);
    setIsReply(false);
  };

  const setCommentEdit = (commentId: string) => {
    // setIsEditReply(commentId);
    setIsCommentReply(commentId);
  };

  const handleCommentReply = (commentId: string) => {
    setIsReply(true);
    setCommentReply(commentId);
  };

  const cancelPublish = () => {
    setIsReply(false);
    setNewTopic(false);
    setCommentReply("");
  };

  return (
    <div className="commentsContainer">
      <div className="commentsHeader">
        <h2 className="commentsTitle">Fórum</h2>
        <Button
          onClick={() => {
            setNewTopic(true);
            setTimeout(
              () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
              300
            );
          }}
          size={{ width: 141, height: 28 }}
          title={"Novo tópico"}
          icon={Image}
          textColor={"#FFFFFF"}
        />
      </div>
      {comments.length <= 0 && !newTopic ? (
        <div className="commentsEmptyForum">
          <img src={ForumVazio} alt="" />
          <h3>Fórum Vazio! Crie uma postagem acima</h3>
        </div>
      ) : (
        <>
          <div className="commentsSeparator" />
          {comments.length > 0 &&
            comments.map((comment) => {
              const commentUser = users.find((u) => u._id === comment.userId);
              return (
                <div key={comment._id}>
                  <Comment
                    comment={comment}
                    commentUser={commentUser}
                    isAuthor={comment.userId === user._id}
                    handleDelete={handleDelete}
                    handleEdit={handleEditText}
                    handleReply={handleCommentReply}
                    setEdit={setCommentEdit}
                    isEditing={isCommentReply === comment._id}
                  />

                  <div className="commentsSeparator" />

                  {comment.replies?.map((reply) => {
                    const replyUser = users.find((u) => u._id === reply.userId);
                    return (
                      <div key={reply._id}>
                        <Comment
                          comment={reply}
                          commentUser={replyUser}
                          isAuthor={reply.userId === user._id}
                          handleDelete={handleDelete}
                          handleEdit={handleEditText}
                          handleReply={handleCommentReply}
                          setEdit={setCommentEdit}
                          isEditing={isCommentReply === reply._id}
                          parentId={comment._id}
                          isReply
                        />
                        <div className="commentsSeparator" />
                      </div>
                    );
                  })}

                  {isReply && commentReply === comment._id && (
                    <>
                      <CreateTopic
                        comment={comment}
                        title="Responder"
                        commentUser={user}
                        handlePublish={handlePublishReply}
                        cancelPublish={cancelPublish}
                        isReply
                      />
                      <div className="commentsSeparator" />
                    </>
                  )}
                </div>
              );
            })}
        </>
      )}

      {newTopic && (
        <>
          <CreateTopic
            title="Publicar"
            handlePublish={handlePublish}
            cancelPublish={cancelPublish}
            commentUser={user}
          />
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
