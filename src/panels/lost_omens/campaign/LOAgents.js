import React, { useEffect, useState } from 'react';
import {
    ModalRoot, InfoRow, ModalPage, ModalPageHeader,
    Button, SimpleCell
} from '@vkontakte/vkui';
import { VKToken } from '../../../consts.js';
import { resolveVkPicturesBatch } from '../../../util/GetVkPhotoSrc.js';
import {LODescriptionCard} from '../character/LODescription.js';

const LOAgentsModal = ({ agents, onClose }) => {
    const MODAL_PAGE_WITH_FIXED_HEIGHT = 'fixed-height';

    function createAgentCard(element) {
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

// Список персонажей кампании: раньше собирался в панели Lost Omens, теперь панель общая
// и отдаёт сюда загруженных игроков через extraSection.
const LOAgents = ({ players, setPopout }) => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function resolvePictures() {
            const cards = players.map((elem) => ({
                name: elem.char_name,
                fullname: elem.fullname,
                race: elem.race,
                background: elem.background,
                appearance: elem.appearance,
                picture: elem.picture,
                room: elem.room,
            })).sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

            // Аватарки тянутся пачками: у кампании их столько же, сколько персонажей.
            const resolved = await resolveVkPicturesBatch(cards, VKToken);
            if (!cancelled) {
                setAgents(resolved);
            }
        }

        if (players.length > 0) {
            resolvePictures();
        }

        return () => { cancelled = true; };
    }, [players]);

    const onClick = () => setPopout(
        <LOAgentsModal agents={agents} onClose={() => setPopout(null)} />,
    );

    if (agents.length === 0) return null;

    return (
        <Button stretched appearance="positive" size="l" onClick={onClick}>Действующие агенты</Button>
    );
};

export default LOAgents;
