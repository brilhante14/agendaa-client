import api from "../api/api";
import { TopLevelComment } from "../components/Forum";

export const useForum = () => {

    const getComments = async (id: string) :Promise<TopLevelComment[]>=> {
        const url = `/turmas/${id}/getComments`;
        try {
            const { data } = await api.get(url);

            return data;
        } catch (error) {
            console.log(error)

            return [];
        }
    }

    return { getComments }
}

