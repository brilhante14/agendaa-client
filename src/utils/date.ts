export const allDays = [
    {
        initial: 'S',
        name: 'Segunda',
        active: false
    },
    {
        initial: 'T',
        name: 'Terça',
        active: false
    },
    {
        initial: 'Q',
        name: 'Quarta',
        active: false
    },
    {
        initial: 'Q',
        name: 'Quinta',
        active: false
    },
    {
        initial: 'S',
        name: 'Sexta',
        active: false
    },
    {
        initial: 'S',
        name: 'Sábado',
        active: false
    },
    {
        initial: 'D',
        name: 'Domingo',
        active: false
    }
]

export type DaysProps = {
    initial: string;
    name: string;
    active: boolean;
}[]