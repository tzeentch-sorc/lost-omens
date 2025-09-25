import {
	HorizontalCell, Avatar

} from '@vkontakte/vkui';

const UserRefCell = ({user}) => {
    return (
        <HorizontalCell onClick={() => { window.open('https://vk.com/im?sel=' + user.id) }} key={user.id} size="s" title={user.first_name}>
            <Avatar size={56} src={user.photo_200} />
        </HorizontalCell>
    );
}

export default UserRefCell;