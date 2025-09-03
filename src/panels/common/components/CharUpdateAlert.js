import { Alert, Button } from "@vkontakte/vkui";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const CharUpdateAlert = ({formLink, navLink, charName, closeMethod}) => {

    const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();

    const renderAction = ({ mode, ...restProps }) => {
		return <Button mode={mode === 'cancel' ? 'secondary' : 'primary'} size="m" {...restProps} />;
	};

    return (
        <Alert
            actions={[
                {
                    title: 'Пропустить',
                    mode: 'cancel',
                    action: () => {
                        params.set('CharName', charName);
                        setParams(params);
                        routeNavigator.push(navLink, { keepSearchParams: true });
                    },
                },
                {
                    title: 'Повысить',
                    mode: 'destructive',
                    action: () => {
                        window.open(formLink, "_blank")
                    },
                }
            ]}
            onClose={closeMethod}
            renderAction={renderAction}
            header={charName + ' нуждается в повышении уровня!'}
            text="Можно повысить уровень прямо сейчас или продолжить работу без повышения"
        />
    )
}

export default CharUpdateAlert;