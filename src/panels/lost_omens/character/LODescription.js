import React, { useEffect, useState } from 'react';
import { Div, Accordion, ContentCard } from '@vkontakte/vkui';
import ColorThief from 'colorthief';

export const LODescriptionCard = ({ room, imageSrc, fullname, backstory, description, race, grad=true }) => {
    const infoStyle = { color: 'var(--vkui--color_text_subhead)' };
    const cardBg = 'var(--vkui--color_background_content)';

    function roomNumber(room) {
        if (!room) return "Таверна Аврора";
        const isOnlyDigits = /^\d+$/.test(room);
        return isOnlyDigits ? `Комната ${room}` : room;
    }

    const [leftColor, setLeftColor] = useState('var(--vkui--color_background_content)');
    const [rightColor, setRightColor] = useState('var(--vkui--color_background_content)');

    
    grad && useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img);
                const left = `rgb(${palette[0].join(',')})`;
                const right = `rgb(${palette[0].join(',')})`;

                // Четырёхцветный градиент: карточка -> левый цвет -> правый цвет -> карточка
                setLeftColor(left);
                setRightColor(right);
            } catch (e) {
                console.warn('Не удалось получить цвета картинки', e);
            }
        };

        img.onerror = () => console.warn('Ошибка загрузки картинки для анализа цветов');

    }, [imageSrc]);

    return (
        <Div style={infoStyle}>
            <ContentCard
                overTitle={backstory}
                title={`${fullname}, ${race}`}
                description={description}
                caption={`Место жительства: ${roomNumber(room)}`}
                src={imageSrc}
                imageObjectFit="contain"
                maxHeight={300}
                style={{
                    backgroundImage: `linear-gradient(to right, ${cardBg}, ${cardBg} 10%, ${leftColor} 45%, ${rightColor} 55%, ${cardBg} 90%, ${cardBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `100% 300px`,
                    backgroundPosition: 'top',
                    backgroundColor: cardBg
                }}
            />
        </Div>
    );
}

const LODescription = ({ room, imageSrc, fullname, backstory, description, race }) => {
    const [openId, setOpenId] = React.useState();

    const data = [
        { id: "description", title: 'Описание' }
    ];

    return (
        <>
            {data.map(({ id, title }) => (
                <Accordion
                    key={id}
                    expanded={openId === id}
                    onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                >
                    <Accordion.Summary iconPosition="before"><b>{title}</b></Accordion.Summary>
                    <Accordion.Content>
                        <LODescriptionCard
                            room={room}
                            imageSrc={imageSrc}
                            fullname={fullname}
                            backstory={backstory}
                            description={description}
                            race={race} />
                    </Accordion.Content>
                </Accordion>
            ))}
        </>
    );
};

export default LODescription;
