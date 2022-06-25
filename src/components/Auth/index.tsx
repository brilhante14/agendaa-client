// Libs
import React from 'react';

// Hooks
import useWindowDimensions from '../../hooks/useWindowDimensions';

// Styles
import {
    Container,
    FormArea,
    ImageArea,
    Image,
    Title
} from './styles';

// Types
interface Props {
    title: string;
    children: React.ReactNode;
    image: string;
    formSide: 'left' | 'right';
}

// Renderer
export function Auth({ title, children, image, formSide }: Props) {
    const { width } = useWindowDimensions();
    return (
        <Container>
            {
                formSide === 'left' &&
                <FormArea>
                    <Title>
                        {title}
                    </Title>
                    {children}
                </FormArea>
            }
            {
                width > 1366 &&
                <ImageArea>
                    <Image src={image} />
                </ImageArea>
            }
            {
                formSide === 'right' &&
                <FormArea>
                    <Title>
                        {title}
                    </Title>
                    {children}
                </FormArea>
            }
        </Container>
    );
}