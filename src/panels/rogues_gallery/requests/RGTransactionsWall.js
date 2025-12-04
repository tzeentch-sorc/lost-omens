import React from 'react';
import {
    Group, CardGrid, ContentCard, ContentBadge, Separator, Spacing
} from '@vkontakte/vkui';

const RGTransactionsWall = ({ transactions }) => {
    const STATUS = {
        REJECTED: 'Отклонено',
        APPROVED: 'Подтверждено',
        PENDING: 'На рассмотрении'
    };
    const sortedData = [...(transactions || [])].sort((a, b) => b.date - a.date);

    const oldT = sortedData.filter(e => e.date < 0);
    const newT = sortedData.filter(e => e.date >= 0);

    function createTransactionCard(element) {
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
                title={`Сумма ${element.money}`}
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
            {newT.length > 0 && <CardGrid size="l">{newT.map(createTransactionCard)}</CardGrid>}

            {oldT.length > 0 && newT.length > 0 && <><Spacing size={12} /> <Separator /> <Spacing size={12} /></>}

            {oldT.length > 0 && <CardGrid size="l">{oldT.map(createTransactionCard)}</CardGrid>}
        </>
    );


}
export default RGTransactionsWall;