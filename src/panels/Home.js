import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Div, FixedLayout, Gradient } from '@vkontakte/vkui';
import CharacterButtons from './CharacterButtons';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		{fetchedUser && <CharacterButtons fetchedUser={fetchedUser} toMain={go}/>}
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
