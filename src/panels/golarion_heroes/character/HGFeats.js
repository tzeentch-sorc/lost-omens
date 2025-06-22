import React from 'react';
import {
    Group, SimpleCell,
    InfoRow
} from '@vkontakte/vkui';



const HGFeats = ({ featlist }) => {


    const data = [
        {
            id: "acc_feat_class",
            title: 'Особые способности',
            detail: 0,
        },
        {
            id: "acc_feat_general",
            title: 'Черты',
            detail: 1,
        }
    ];

    function createFeatRow(element) {
        var lvl = element.split('.')[0];
        var name = element.split('.')[1];
        var description ="Уровень "+lvl;
        return (
            <SimpleCell multiline key={element}>
                <InfoRow header={description}>{name}</InfoRow>
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

export default HGFeats;