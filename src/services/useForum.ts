import api from "../api/api";

export const useForum = () => {

    async function getComments(id: string) {
        const url = `/turmas/${id}/getComments`;
        try {
            const comments = await api.get(url);
    
            return comments;
        } catch (error) {
            console.log(error)
        }
    }

    return { getComments }
}

