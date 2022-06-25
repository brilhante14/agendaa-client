/**
 * Hook WindowDimensions - Responsável por realizar o controle e acesso ao tamanho da janela do usuário, determinando se o sistema deve
 * ser apresentado em layout para mobile ou não. Além disso irá retornar o tamanho da janela.
 * */

// Libs
import { useState, useEffect } from "react";

/**
 * Função que retorna o tamanho da janela do usuário e determina o valor do atributo isMobile.
 * */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
        isMobile: (width < 768)
    };
}

// Renderer
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}