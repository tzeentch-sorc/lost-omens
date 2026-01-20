import React from 'react';
import {
    Group, CardGrid, ContentCard, Spacing, ContentBadge, Separator
} from '@vkontakte/vkui';

const RGDowntimeWall = ({ downtime }) => {
    const STATUS = {
        REJECTED: 'Отклонено',
        APPROVED: 'Подтверждено',
        PENDING: 'На рассмотрении'
    };

    const sortedData = [...(downtime || [])].sort((a, b) => b.date - a.date);

    const oldD = sortedData.filter(e => e.date < 0);
    const newD = sortedData.filter(e => e.date >= 0);


    function createDowntimeCard(element) {
        if (element.count === 0) return null;
        let mode = "plain";
        let appearance = "neutral";

        // normalize status: use PENDING for any unknown value
        const allowed = Object.values(STATUS);
        const status = allowed.includes(element.approved) ? element.approved : STATUS.PENDING;

        switch (status) {
            case STATUS.REJECTED:
                mode = "tint";
                appearance = "accent-red";
                break;
            case STATUS.APPROVED:
                mode = "outline";
                appearance = "accent-green";
                break;
            case STATUS.PENDING:
            default:
                mode = "plain";
                appearance = "neutral";
                break;
        }
        
        return (
            <ContentCard
                key={element.date+element.comment}
                overTitle={element.activity}
                title={`Потрачено ${element.time} ч.`}
                description={element.comment}
                caption={<><ContentBadge
                    size="s"
                    appearance={appearance}
                    mode='outline'>
                    {status}
                </ContentBadge>  {element.master}</>}
                mode={mode}
            />
        );
    }
    
    return (
        <>
            {newD.length > 0 && <CardGrid size="l">{newD.map(createDowntimeCard)}</CardGrid>}

            {oldD.length > 0 && newD.length > 0 && <><Spacing size={12} /> <Separator /> <Spacing size={12} /></>}

            {oldD.length > 0 && <CardGrid size="l">{oldD.map(createDowntimeCard)}</CardGrid>}
        </>
    );
}
export default RGDowntimeWall;