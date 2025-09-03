import React from 'react';
import {
    Group, SimpleCell,
    InfoRow
} from '@vkontakte/vkui';



const SMFeats = ({ featlist }) => {


    const data = [
        {
            id: "acc_feat_general",
            title: 'Черты',
            detail: 0,
        },
        {
            id: "acc_feat_class",
            title: 'Классовые выборы',
            detail: 1,
        },
    ];

    function createFeatRow(element) {
        return (
            <SimpleCell multiline key={element}>
                <InfoRow>{element}</InfoRow>
            </SimpleCell>
        );
    }

    return (
        <Group
            id="feats"
            mode="plain">

            {data.map(

                ({ id, title, detail }) => featlist[detail] && featlist[detail][0] != "" && (
                    <SimpleCell multiline key={id}>
                        <InfoRow header={<b>{title}</b>}>{featlist[detail].map(e => createFeatRow(e))}</InfoRow>
                    </SimpleCell>
                )
            )}

        </Group>);

};

export default SMFeats;