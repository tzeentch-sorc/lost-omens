import { Group, Header, HorizontalScroll } from "@vkontakte/vkui";
import UserRefCell from './UserRefCell';

const MastersGroup = ({ masters }) => {
    return (
        <Group mode="card" header={
            <Header
                mode='secondary'
                subtitle="Этим людям можно написать, если остались вопросы"
            >
                Мастера
            </Header>}>
            <HorizontalScroll>
                <div style={{ display: 'flex' }}>
                    {masters && masters.map((masterRef) => <UserRefCell user={masterRef} key={masterRef.id} />)}
                </div>
            </HorizontalScroll>
        </Group>
    )
}

export default MastersGroup;