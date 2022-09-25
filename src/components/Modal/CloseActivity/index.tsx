import './styles.css';
import Modal from "..";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import Switch from '@mui/material/Switch';

interface props {
    isOpen: boolean;
    handleOpen: (status: boolean) => void;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export function CloseActivity({ isOpen, handleOpen }: props) {
    return (
        <Modal handleOpen={handleOpen}>
            <div className='closeActivityContainer'>
                <div className='closeActivityRow'>
                    <p className='closeActivityTitle'>
                        Nome da atividade:
                    </p>
                    <p className='closeActivityName'>
                        Compilador de Javascripto
                    </p>
                </div>
                <div className='closeActivitySeparator' />
                <div className='closeActivityRow'>
                    <p className='closeActivityTitle'>
                        A atividade impactou na média?
                    </p>
                    <Switch {...label} />
                </div>
                <TextInput onChange={() => { }} placeholder={"+/- pontuação"} />
                <div className='closeActivitySeparator' />
                <div className='closeActivitySeparator' />
                <div className='closeActivityButtonContainer'>
                    <Button onClick={() => { }} size={{ width: 165, height: 39 }} title={"Concluir atividade"} />
                </div>
            </div>
        </Modal>
    );
}