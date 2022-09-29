import React, { useState } from "react";
import { CommentType, IUser } from "..";
import { handleDate } from "../../../utils/formatDate";
import { Button } from "../../Button";
import ReplyImage from "../../../assets/reply.png";
import TrashImage from "../../../assets/trash.png";
import PencilImage from "../../../assets/pencil.png";

import "../styles.css"
import { IGeneralForum } from "../../../services/useForum";

interface ICommentProps {
   commentUser?: IUser,
   comment: IGeneralForum,
   setEdit: (commentId: number, isReply: boolean) => void,
   handleReply: (commentId: number) => void,
   handleEdit: (text: string, commentId: number, isReply?: boolean) => void,
   handleDelete: (commentId: number, isReply?: boolean) => void,
   parentId?: number,
   isEditing?: boolean,
   isReply?: boolean,
   isAuthor?: boolean,
}

export function Comment({ comment, isReply = false, isEditing = false, isAuthor = false, commentUser, parentId, setEdit, handleEdit, handleReply, handleDelete }: ICommentProps) {
   const [editText, setEditText] = useState("");

   return (
      <div className={isReply ? "commentReply" : "commentsComment"}>
         <div className="commentsHeader">
            <div className="commentsHeaderInfo">
               <img alt="User profile" className="commentsProfileImage" src={commentUser?.photo} />
               <p className="commentsProfileName">{commentUser?.name}</p>
               <p className="commentsDateText">{handleDate(comment.createdAt)}</p>
            </div>

            {isEditing ? (
               <Button
                  title={"Deletar"}
                  onClick={() => {
                     handleDelete(comment.id, isReply);
                  }}
                  size={{ width: 144, height: 28 }}
                  icon={TrashImage}
                  textColor={"#FB6262"}
                  backgroundColor={"none"}
                  align={"flex-end"}
               />
            ) : (
               <div className="commentsButtonArea">
                  {isAuthor && (
                     <Button
                        title={"Editar"}
                        onClick={() => {
                           setEditText(comment.text);
                           setEdit(comment.id, isReply);
                        }}
                        size={{ width: 120, height: 28 }}
                        icon={PencilImage}
                        textColor={"#5357B6"}
                        backgroundColor={"none"}
                        align={"flex-end"}
                     />
                  )}
                  {!isReply && (
                     <Button
                        title={"Responder"}
                        onClick={() => {
                           handleReply(comment.id);
                        }}
                        size={{ width: 120, height: 28 }}
                        icon={ReplyImage}
                        textColor={"#5357B6"}
                        backgroundColor={"none"}
                        align={"flex-end"}
                     />
                  )}
               </div>
            )}
         </div>

         {isEditing ? (
            <>
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
                     onClick={() => {
                        setEdit(0, isReply);
                     }}
                  />
                  <Button
                     isDisabled={!editText}
                     title={"Editar"}
                     size={{ width: 121, height: 28 }}
                     onClick={() => {
                        handleEdit(editText, comment.id, isReply);
                     }}
                  />
               </div>
            </>
         ) : (
            <p className="commmentText">{comment.text}</p>
         )}
      </div>
   )
}