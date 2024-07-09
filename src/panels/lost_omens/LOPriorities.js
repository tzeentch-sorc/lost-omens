import React, { useEffect, useState } from 'react';
import {
    Group, ModalRoot, InfoRow, ModalPage, ModalPageHeader,
    CellButton, SimpleCell
} from '@vkontakte/vkui';

const LOPrioritiesModal = ({ prioritiesGroupped, onClose }) => {
    const MODAL_PAGE_WITH_FIXED_HEIGHT = 'fixed-height';

    function createPriorityRow(element) {
        //console.log("element",element);
        return (
            <SimpleCell multiline key={element[0]}>
                <InfoRow header={element[0]}>
                    <b>{element[1][0].prio>=10 ? element[1][0].prio: " "+element[1][0].prio}  |   </b>
                    {element[1].sort((a, b) => b.lvl - a.lvl).map(e => (
                        e.lvl + " ур. " + e.char_name + ", "))}

                </InfoRow>
            </SimpleCell>
        );
    }

    return (
        <ModalRoot activeModal={MODAL_PAGE_WITH_FIXED_HEIGHT} onClose={onClose}>
            <ModalPage
                id={MODAL_PAGE_WITH_FIXED_HEIGHT}
                onClose={onClose}
                settlingHeight={100}
                height={'70%'}
                hideCloseButton={false}
                header={
                    <ModalPageHeader>
                        Список приоритетов
                    </ModalPageHeader>
                }
            >
                {prioritiesGroupped.map(e => (createPriorityRow(e)))}
            </ModalPage>

        </ModalRoot>
    );
};

const LOPriorities = ({ priorities, setPopout }) => {
    function setupPriorities(priorities) {
        var result = new Map();
        priorities.forEach((item) => {
            if (result.has(item.player)) {
                result.set(item.player, result.get(item.player).concat([item]));
            } else {
                result.set(item.player, [item]);
            }
        }
        );

        console.log(result);

        return Array.from(result);
    }

    const onClick = () => setPopout(<LOPrioritiesModal prioritiesGroupped={setupPriorities(priorities)} onClose={() => setPopout(null)} />);

    return (
        <Group><CellButton onClick={onClick}>Открыть список приоритетов</CellButton></Group>);
};
export default LOPriorities;