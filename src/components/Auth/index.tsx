import React from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import './styles.css';

interface Props {
    title: string;
    children: React.ReactNode;
    image: string;
    formSide: 'left' | 'right';
}

export function Auth({ title, children, image, formSide }: Props) {
    const { width } = useWindowDimensions();
    return (
        <div className='authComponentContainer'>
            {
                formSide === 'left' &&
                <div className='authComponentFormArea'>
                    <p className='authComponentTitle'>
                        {title}
                    </p>
                    {children}
                </div>
            }
            {
                width > 1366 &&
                <div className='authComponentImageArea'>
                    <img src={image} height={"50%"}/>
                </div>
            }
            {
                formSide === 'right' &&
                <div className='authComponentFormArea'>
                    <p className='authComponentTitle'>
                        {title}
                    </p>
                    {children}
                </div>
            }
      </div>
    );
}