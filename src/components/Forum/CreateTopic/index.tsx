import React, { useState } from "react";
import { CommentType } from "..";
import { Button } from "../../Button";

import "../styles.css"

interface ICreateTopicProps {
  commentUser: { _id: string; photo: string; nome: string },
  handlePublish: (text: string, userId: string, commentId?: string) => void,
  cancelPublish: () => void,
  title: string,
  isReply?: boolean,
  comment?: CommentType,
}

export function CreateTopic({ comment, isReply = false, commentUser, title, handlePublish, cancelPublish }: ICreateTopicProps) {
  const [editText, setEditText] = useState("");

  return (
    <div className={isReply ? "commentReply" : "commentsComment"}>
      <div className="commentHeader">
        <div className="commentsHeaderInfo">
          <img alt="User profile" className="commentsProfileImage" src={commentUser.photo} />
          <p className="commentsProfileName">{commentUser.nome}</p>
        </div>
      </div>
      <div className="commentsSeparator" />
      <textarea
        className="commentReplyText"
        placeholder={"Escreva sua resposta"}
        value={editText}
        onChange={e => setEditText(e.target.value)}
      />
      <div className="commentsSeparator" />

      <div className="commentEditButtonArea">
        <Button
          title={"Cancelar"}
          size={{ width: 121, height: 28 }}
          onClick={cancelPublish}
        />
        <Button
          title={title}
          isDisabled={!editText}
          size={{ width: 121, height: 28 }}
          onClick={() => handlePublish(editText, commentUser._id, comment?._id)}
        />
      </div>
    </div>
  );
}