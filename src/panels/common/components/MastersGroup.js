import { Group, Header, HorizontalScroll } from "@vkontakte/vkui";
import UserRefCell from './UserRefCell';
import { MastersNoCharsText } from "../../../consts";

const MastersGroup = ({ masters, text={MastersNoCharsText} }) => {
    return (
        <Group mode="card" header={
            <Header
                mode='secondary'
                subtitle={text}
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