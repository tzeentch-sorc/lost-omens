import React from 'react';
import {
    Group, CardGrid, ContentCard, ContentBadge, Separator, Spacing
} from '@vkontakte/vkui';

const RCGTransactionsWall = ({ transactions }) => {
    const STATUS_BY_VALUE = {
    'Одобрено': STATUS.APPROVED,
    'Нет': STATUS.REJECTED,
};
    const STATUS = {
        REJECTED: 'Отклонено',
        APPROVED: 'Подтверждено',
        PENDING: 'На рассмотрении'
    };

    const oldT = transactions.filter(e => e.new == "FALSE");
    const newT = transactions.filter(e => e.new == "TRUE");

    function createTransactionCard(element) {
        if (element.count === 0) return null;
        let mode = "plain";
        let appearance = "neutral";

        // normalize status: use PENDING for any unknown value
        const status = STATUS_BY_VALUE[element.approved] ?? STATUS.PENDING;

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
                key={element.activity+element.name+element.money+element.rep}
                overTitle={element.activity}
                title={`Сумма ${element.money}`}
                description={element.comment}
                caption={<><ContentBadge
                    size="s"
                    appearance={appearance}
                    mode='outline'>
                    {status}
                </ContentBadge>  {element.rep}</>}
                mode={mode}
            />
        );
    }
    return (

        <>
            {newT.length > 0 && <CardGrid size="l">{newT.map(createTransactionCard)}</CardGrid>}

            {oldT.length > 0 && newT.length > 0 && <><Spacing size={12} /> <Separator /> <Spacing size={12} /></>}

            {oldT.length > 0 && <CardGrid size="l">{oldT.map(createTransactionCard)}</CardGrid>}
        </>
    );


}
export default RCGTransactionsWall;