import React from 'react';
import {
    Group, CardGrid, ContentCard, Separator, ContentBadge
} from '@vkontakte/vkui';

const RGDowntimeWall = ({ downtime }) => {

    function createDowntimeCard(element) {
        if (element.count === 0) return null;
        let mode = "plain";
        let appearance = "neutral";
        if (element.approved === "Отклонено"){
            mode = "tint";
            appearance = "accent-red";
        }else if (element.approved === "Подтверждено") {
            mode = "outline";
            appearance = "accent-green";
        } else if (element.approved === "На рассмотрении") {
            mode = "plain";
            appearance = "neutral";
        }
        
        return (
            <ContentCard
                overTitle={element.activity}
                title={`Потрачено ${element.time} ч.`}
                description={element.comment}
                caption={<><ContentBadge
                    size="s"
                    appearance={appearance}
                    mode='outline'>
                    {element.approved}
                </ContentBadge>  {element.master}</>}
                mode={mode}
            />
        );
    }
    return (
        <CardGrid size="l">
            <Separator />
            
            {downtime && downtime.map(createDowntimeCard)}
        </CardGrid>

    );
}
export default RGDowntimeWall;