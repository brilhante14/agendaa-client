import React from "react";
import Carousel from 'react-elastic-carousel';

import chevronRight from '../../assets/svg/chevron-right.svg'
import chevronLeft from '../../assets/svg/chevron-left.svg'

import "./index.css";

const Atividades = () => {
    const consts = {
        PREV: "PREV",
        NEXT: "NEXT",
        START: "flex-start",
        CENTER: "center",
        END: "flex-end"
    };

    function myArrow({ type, onClick, isEdge }: any) {
        const pointer = type === consts.PREV ? `${chevronLeft}` : chevronRight
        return (
            <button aria-label="Arrows" onClick={onClick} className="atividades_carouselArrows" disabled={isEdge}>
                <img height={"12px"} width={"12px"} src={pointer} alt="Search Button" />
            </button>
        )
    }

    return (
        <div className="atividades_Container">
            <div className="atividades_headerContainer">
                <h1 className="atividades_day">3 de Maio</h1>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <h2 className="atividades_subtitle">Presença</h2>
                </div>
            </div>
            <div className="atividades_carrosselContainer">
                <h2>Atividades do Dia</h2>
                {/* <Carousel
                    verticalMode={true}
                    itemsToShow={2}
                    renderArrow={myArrow}
                    pagination={false}
                >
                    <div>items</div>
                    <div>items</div>
                    <div>items</div>
                </Carousel> */}
            </div>
        </div>
    );
}

export default Atividades;