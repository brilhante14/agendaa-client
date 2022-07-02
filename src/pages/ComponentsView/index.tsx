// Libs
import { Activities } from '../../components/Modal/Activities';
import { ClassModal } from '../../components/Modal/ClassModal';
import { Material } from '../../components/Modal/Material';

// Styles

// Renderer
export function ComponentsView() {
    return (
        <>
            <ClassModal isOpen={false} />
            <Activities isOpen={false} />
            <Material isOpen={true} />
        </>
    );
}