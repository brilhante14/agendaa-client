// Libs
import React, { useEffect } from "react";
import { Button } from "../Button";
import Image from "../../assets/new_topic.png";
import ForumVazio from "../../assets/forum_vazio.png";
import { useForum, IComment } from "../../services/useForum";
import api from "../../api/api";
import { CreateTopic } from "./CreateTopic";
import { Comment } from "./Comment";

import "./styles.css";
interface Props {
  id?: number;
}

export interface CommentType {
  _id: string;
  createdAt: Date;
  text: string;
  userId: string;
}

export interface IUser {
  userId: number;
  photo: string;
  name: string;
}

export function Forum({ id = 0 }: Props) {
  const [isEditingComment, setIsEditingComment] = React.useState(0);
  const [isEditingReply, setIsEditingReply] = React.useState(0);
  const [isReply, setIsReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState(0);
  const [newTopic, setNewTopic] = React.useState(false);
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [user, setUser] = React.useState<IUser>({} as any);
  const useForumService = useForum();

  const bottomRef = React.useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    api.get("/usuarios/").then((res) => {
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
      console.log(commentsResult);
    });
  };

  function handleEditText(
    text: string,
    commentID: number,
    isReply?: boolean
  ) {
    api
      .patch(`/turmas/${isReply ? 'reply' : 'comment'}/${commentID}`, { text })
      .then(() => {
        refreshForum();
        setIsEditingComment(0);
        setIsEditingReply(0);
      });
  }

  function handleDelete(
    commentID: number,
    isReply?: boolean
  ) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      api
        .delete(`/turmas/${isReply ? 'reply' : 'comment'}/${commentID}`)
        .then(() => {
          refreshForum();
          setIsEditingComment(0);
          setIsEditingReply(0);
        });
    }
  }

  function handleReply(commentID: number, userID: number, text: string) {
    api
      .post("/turmas/reply", {
        commentId: commentID,
        userId: userID,
        text: text,
      })
      .then(() => {
        refreshForum();
      });
  }

  function handleNewTopic(text: string, userID: number, classID?: number) {
    api
      .post(`/turmas/comment`, {
        text: text,
        userId: userID,
        turmaId: classID
      })
      .then(() => {
        refreshForum();
        setNewTopic(false);
      });
  }

  const handlePublish = (text: string, userId: number) => {
    handleNewTopic(text, userId, id);
    setNewTopic(false);
  };

  const handlePublishReply = (
    text: string,
    userId: number,
    commentId: number = 0
  ) => {
    handleReply(commentId, userId, text);
    setIsReply(false);
  };

  const setCommentEdit = (commentId: number, isReply: boolean) => {
    isReply ?
      setIsEditingReply(commentId)
      :
      setIsEditingComment(commentId);
  };

  const handleCommentReply = (commentId: number) => {
    setIsReply(true);
    setCommentReply(commentId);
  };

  const cancelPublish = () => {
    setIsReply(false);
    setNewTopic(false);
    setCommentReply(0);
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
              const commentUser = users.find((u) => u.userId === comment.userId);
              return (
                <div key={comment.id}>
                  <Comment
                    comment={comment}
                    commentUser={commentUser}
                    isAuthor={comment.userId === user.userId}
                    handleDelete={handleDelete}
                    handleEdit={handleEditText}
                    handleReply={handleCommentReply}
                    setEdit={setCommentEdit}
                    isEditing={isEditingComment === comment.id}
                  />

                  <div className="commentsSeparator" />

                  {comment.replies?.map((reply) => {
                    const replyUser = users.find((u) => u.userId === reply.userId);
                    return (
                      <div key={reply.id}>
                        <Comment
                          comment={reply}
                          commentUser={replyUser}
                          isAuthor={reply.userId === user.userId}
                          handleDelete={handleDelete}
                          handleEdit={handleEditText}
                          handleReply={handleCommentReply}
                          setEdit={setCommentEdit}
                          isEditing={isEditingReply === reply.id}
                          parentId={comment.id}
                          isReply
                        />
                        <div className="commentsSeparator" />
                      </div>
                    );
                  })}

                  {isReply && commentReply === comment.id && (
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
