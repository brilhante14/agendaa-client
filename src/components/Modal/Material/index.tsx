// Styles
import {
    Container,
    Separator,
    ButtonContainer
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';

interface props {
    isOpen: boolean;
}

// Renderer
export function Material({ isOpen }: props) {
    return (
        <Modal isOpen={isOpen}>
            <Container>
                <TextInput onChange={() => { }} placeholder={"Ex.: Anotações"} title={"Nome do material"} />
                <Separator />
                <TextInput onChange={() => { }} placeholder={"Ex.: google.com"} title={"Link do material"} />
                <Separator />
                <Separator />
                <ButtonContainer>
                    <Button onClick={() => { }} size={{ width: 165, height: 39 }} title={"Cadastrar material"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}