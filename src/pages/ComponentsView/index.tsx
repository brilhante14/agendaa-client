// Libs
import { Activities } from '../../components/Modal/Activities';
import { ClassModal } from '../../components/Modal/ClassModal';

// Styles

// Renderer
export function ComponentsView() {
    return (
        <>
            <ClassModal isOpen={false} />
            <Activities isOpen={true} />
        </>
    );
}