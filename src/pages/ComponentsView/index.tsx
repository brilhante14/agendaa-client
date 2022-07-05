// Libs
import { Forum } from '../../components/Forum';
import { Activities } from '../../components/Modal/Activities';
import { ClassModal } from '../../components/Modal/ClassModal';
import { CloseActivity } from '../../components/Modal/CloseActivity';
import { ModalMaterial } from '../../components/Modal/ModalMaterial';

// Styles

// Renderer
export function ComponentsView() {
    return (
        <>
            <ClassModal isOpen={false} />
            <Activities isOpen={false} />
            <ModalMaterial isOpen={false} />
            <CloseActivity isOpen={false} />
            <Forum />
        </>
    );
}