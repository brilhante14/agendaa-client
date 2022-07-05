// Styles
import {
    Container,
    Separator,
    ButtonContainer,
    Row,
    Title,
    Name
} from './styles';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import Switch from '@mui/material/Switch';

interface props {
    isOpen: boolean;
    handleOpen: (status: boolean) => void;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

// Renderer
export function CloseActivity({ isOpen, handleOpen }: props) {
    return (
        <Modal handleOpen={handleOpen}>
            <Container>
                <Row>
                    <Title>
                        Nome da atividade:
                    </Title>
                    <Name>
                        Compilador de Javascripto
                    </Name>
                </Row>
                <Separator />
                <Row>
                    <Title>
                        A atividade impactou na média?
                    </Title>
                    <Switch {...label} />
                </Row>
                <TextInput onChange={() => { }} placeholder={"+/- pontuação"} />
                <Separator />
                <Separator />
                <ButtonContainer>
                    <Button onClick={() => { }} size={{ width: 165, height: 39 }} title={"Concluir atividade"} />
                </ButtonContainer>
            </Container>
        </Modal>
    );
}