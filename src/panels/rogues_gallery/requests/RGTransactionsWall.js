import React from 'react';
import {
    Group, CardGrid, ContentCard, Separator, ContentBadge
} from '@vkontakte/vkui';

const RGTransactionsWall = ({ transactions }) => {

    function createTransactionCard(element) {
        if (element.count === 0) return null;
        let mode = "plain";
        let appearance = "neutral";
        
        switch (element.approved) {
            case "Отклонено":
                mode = "tint";
                appearance = "accent-red";
                break;
            case "Подтверждено":
                mode = "outline";
                appearance = "accent-green";
                break;
            case "На рассмотрении":
                mode = "plain";
                appearance = "neutral";
                break;
            default:
                mode = "plain";
                appearance = "neutral";
                break;
        }

        return (
            <ContentCard
                overTitle={element.activity}
                title={`Сумма ${element.money}`}
                description={element.comment}
                caption={<><ContentBadge
                    size="s"
                    appearance={appearance}
                    mode='outline'>
                    {element.approved ? element.approved : "На рассмотрении"}
                </ContentBadge>  {element.master}</>}
                mode={mode}
            />
        );
    }
    return (
        <CardGrid size="l">
            <Separator />

            {transactions && transactions.map(createTransactionCard)}
        </CardGrid>

    );
}
export default RGTransactionsWall;