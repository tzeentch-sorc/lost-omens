import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Div, FixedLayout, Gradient } from '@vkontakte/vkui';
import CharachterButtons from './CharachterButtons';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Lost Omens</PanelHeader>
		<Group header={<Header mode="secondary">Ваши персонажи</Header>}>
			{fetchedUser && <CharachterButtons fetchedUser={fetchedUser} />}
			<FixedLayout vertical="bottom">
				<Div>
					<Button stretched appearance="negative" size="l" onClick={go}>
						Go back
					</Button>
				</Div>
			</FixedLayout>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
		screen_name: PropTypes.string
	}),
};

export default Home;
