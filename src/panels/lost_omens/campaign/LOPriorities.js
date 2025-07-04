import React from 'react';
import {
    ModalRoot, InfoRow, ModalPage, ModalPageHeader,
    Button, SimpleCell
} from '@vkontakte/vkui';

const LOPrioritiesModal = ({ prioritiesGroupped, onClose }) => {
    const MODAL_PAGE_WITH_FIXED_HEIGHT = 'fixed-height';
    function createPriorityRow(element) {
        //console.log("element",element);
        let srt = element[1].sort((a, b) => b.lvl - a.lvl).map(e => (
            e.lvl + " ур. " + e.char_name + ", "));
        srt[srt.length - 1] = srt[srt.length - 1].substring(0, srt[srt.length - 1].length - 2);
        return (
            <SimpleCell multiline key={element[0]} after={element[1][0].prio}>
                <InfoRow header={element[0]}>
                    {srt}

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

const LOPriorities = ({ priorities, setPopout, appearance }) => {
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
        <Button stretched appearance={appearance} size="l" onClick={onClick}>Приоритеты</Button>
    );
};
export default LOPriorities;