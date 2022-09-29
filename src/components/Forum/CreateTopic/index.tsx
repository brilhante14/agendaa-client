import React, { useState } from "react";
import { CommentType, IUser } from "..";
import { IGeneralForum } from "../../../services/useForum";
import { Button } from "../../Button";

import "../styles.css"

interface ICreateTopicProps {
  commentUser: IUser,
  handlePublish: (text: string, userId: number, commentId?: number) => void,
  cancelPublish: () => void,
  title: string,
  isReply?: boolean,
  comment?: IGeneralForum,
}

export function CreateTopic({ comment, isReply = false, commentUser, title, handlePublish, cancelPublish }: ICreateTopicProps) {
  const [editText, setEditText] = useState("");

  return (
    <div className={isReply ? "commentReply" : "commentsComment"}>
      <div className="commentHeader">
        <div className="commentsHeaderInfo">
          <img alt="User profile" className="commentsProfileImage" src={commentUser.photo} />
          <p className="commentsProfileName">{commentUser.name}</p>
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
          onClick={() => handlePublish(editText, commentUser.userId, comment?.id)}
        />
      </div>
    </div>
  );
}