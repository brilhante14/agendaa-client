import api from "../api/api";

export interface IGeneralForum {
    id: number,
    userId: number,
    turmaId: number,
    text: string,
    createdAt: Date
}

export interface IComment extends IGeneralForum {
    replies: IGeneralForum[]
}

export const useForum = () => {

    const getComments = async (id: number): Promise<IComment[]> => {
        const url = `/turmas/${id}/getComments`;
        try {
            const { data } = await api.get(url);

            const commentsArray: IComment[] = [];

            data.forEach((comment: any) => {
                if (comment["Replies_id"]) {
                    const commentExits = commentsArray.findIndex(commentToFilter => commentToFilter.id === comment.Comments_id);
                    if (commentExits > 0) {
                        commentsArray.map(commentToAdd => {
                            return (
                                {
                                    ...commentToAdd,
                                    replies: commentToAdd.replies.push({
                                        id: comment.Replies_id,
                                        userId: comment.Replies_userId,
                                        turmaId: comment.Replies_turmaId,
                                        text: comment.Replies_text,
                                        createdAt: comment.Replies_createdAt,
                                    })
                                }
                            )
                        })
                    } else {
                        commentsArray.push({
                            id: comment.Comments_id,
                            userId: comment.Comments_userId,
                            turmaId: comment.Comments_turmaId,
                            text: comment.Comments_text,
                            createdAt: comment.Comments_createdAt,
                            replies: [{
                                id: comment.Replies_id,
                                userId: comment.Replies_userId,
                                turmaId: comment.Replies_turmaId,
                                text: comment.Replies_text,
                                createdAt: comment.Replies_createdAt,
                            }]
                        })
                    }
                } else {
                    commentsArray.push({
                        id: comment.Comments_id,
                        userId: comment.Comments_userId,
                        turmaId: comment.Comments_turmaId,
                        text: comment.Comments_text,
                        createdAt: comment.Comments_createdAt,
                        replies: []
                    })
                }
                // return result;
            })

            return commentsArray;
        } catch (error) {
            console.log(error)

            return [];
        }
    }

    return { getComments }
}

