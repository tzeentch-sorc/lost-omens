import { Alert, Button } from "@vkontakte/vkui";
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const RGCharUpdateAlert = ({navLink, charName, closeMethod}) => {

    const routeNavigator = useRouteNavigator();
	const [params, setParams] = useSearchParams();

    const renderAction = ({ mode, ...restProps }) => {
		return <Button mode={mode === 'cancel' ? 'secondary' : 'primary'} size="m" {...restProps} />;
	};

    return (
        <Alert
            actions={[
                {
                    title: 'Принимаю к сведению',
                    mode: 'destructive',
                    action: () => {
                        params.set('CharName', charName);
                        setParams(params);
                        routeNavigator.push(navLink, { keepSearchParams: true });
                    },
                },
            ]}
            onClose={closeMethod}
            renderAction={renderAction}
            header={charName + ' нуждается в обновлении навыка!'}
            text="Можно обновить навык прямо сейчас, если написать одному из мастеров"
        />
    )
}

export default RGCharUpdateAlert;