import React from 'react';
import {
    Group, SimpleCell,
    InfoRow
} from '@vkontakte/vkui';



const LOFeats = ({ featlist }) => {


    const data = [
        {
            id: "acc_feat_race",
            title: 'Расовые черты',
            detail: 0,
        },
        {
            id: "acc_feat_general",
            title: 'Общие черты',
            detail: 1,
        },
        {
            id: "acc_feat_class",
            title: 'Классовые черты',
            detail: 2,
        },
        {
            id: "acc_feat_skill",
            title: 'Черты навыков',
            detail: 3,
        },
        {
            id: "acc_feat_archetype",
            title: 'Черты архетипа',
            detail: 4,
        },
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
            )

            }

        </Group>);

};

export default LOFeats;