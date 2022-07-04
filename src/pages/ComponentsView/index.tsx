// Libs
import { Forum } from '../../components/Forum';
import { Activities } from '../../components/Modal/Activities';
import { ClassModal } from '../../components/Modal/ClassModal';
import { CloseActivity } from '../../components/Modal/CloseActivity';
import { Material } from '../../components/Modal/Material';

// Styles

// Renderer
export function ComponentsView() {
    return (
        <>
            <ClassModal isOpen={false} />
            <Activities isOpen={false} />
            <Material isOpen={false} />
            <CloseActivity isOpen={false} />
            <Forum />
        </>
    );
}