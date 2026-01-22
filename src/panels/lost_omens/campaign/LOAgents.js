import React from 'react';
import {
    ModalRoot, InfoRow, ModalPage, ModalPageHeader,
    Button, SimpleCell
} from '@vkontakte/vkui';
import * as logger from '../../../util/Logger.js';
import {LODescriptionCard} from '../character/LODescription.js';

const LOAgentsModal = ({ agents, onClose }) => {
    const MODAL_PAGE_WITH_FIXED_HEIGHT = 'fixed-height';

    function createAgentCard(element) {
        logger.log("element",element);
        const name = element.fullname && element.fullname != "" ? element.fullname : element.name;
        //logger.log("name",name);
        
        return (
            <LODescriptionCard
                key={element.name}
                room={element.room}
                imageSrc={element.resolvedPicture}
                fullname={name}
                backstory={element.background}
                description={element.appearance}
                race={element.race}
                grad={false} />
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
                        Действующие агенты
                    </ModalPageHeader>
                }
            >
                {agents.map(e => (createAgentCard(e)))}
            </ModalPage>

        </ModalRoot>
    );
};

const LOAgents = ({ agents, setPopout, appearance }) => {

    const onClick = () => setPopout(<LOAgentsModal agents={agents} onClose={() => setPopout(null)} />);

    return (
        <Button stretched appearance={appearance} size="l" onClick={onClick}>Действующие агенты</Button>
    );
};
export default LOAgents;