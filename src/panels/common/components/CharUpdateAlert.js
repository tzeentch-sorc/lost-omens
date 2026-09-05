import { Alert, Button } from "@vkontakte/vkui";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

// Там, где повышение оформляется гугл-формой, у игрока есть выбор: пропустить или повыситься.
// Там, где повышение делает мастер, formLink передавать нечего — остаётся уведомление без действия.
const withFormDescription = 'Можно повысить уровень прямо сейчас или продолжить работу без повышения';
const noFormDescription = 'Можно повысить уровень прямо сейчас, если написать одному из мастеров';

const CharUpdateAlert = ({
    charName,
    navLink,
    closeMethod,
    formLink,
    title = charName + ' нуждается в повышении уровня!',
    description = formLink ? withFormDescription : noFormDescription
}) => {

    const routeNavigator = useRouteNavigator();
    const [params, setParams] = useSearchParams();

    const renderAction = ({ mode, ...restProps }) => {
        return <Button mode={mode === 'cancel' ? 'secondary' : 'primary'} size="m" {...restProps} />;
    };

    const goToCharacter = () => {
        params.set('CharName', charName);
        setParams(params);
        routeNavigator.push(navLink, { keepSearchParams: true });
    };

    const actions = formLink
        ? [
            {
                title: 'Пропустить',
                mode: 'cancel',
                action: goToCharacter,
            },
            {
                title: 'Повысить',
                mode: 'destructive',
                action: () => {
                    window.open(formLink, "_blank")
                },
            }
        ]
        : [
            {
                title: 'Принимаю к сведению',
                mode: 'destructive',
                action: goToCharacter,
            },
        ];

    return (
        <Alert
            actions={actions}
            onClose={closeMethod}
            renderAction={renderAction}
            title={title}
            description={description}
        />
    )
}

export default CharUpdateAlert;
