import React, { useEffect, useState } from 'react';
import { Button, Div, Group, Panel, Header, ScreenSpinner, SplitCol, SplitLayout, View, FixedLayout, PanelHeader } from '@vkontakte/vkui';
import axios from 'axios';
import Character from './Character';


const GOOGLE_SCRIPTS_BASE_URL = 'https://script.google.com/macros/s/AKfycbyHwbc7G8ZBzv4wD-dRuLQNLcjibe3MSNd_a7tQUEVvmdV9-mcl46sR64otlmZH1V7IcQ/exec'

const ROUTES = {
    LIST: 'list',
    CHAR: 'char'
}


const CharacterButtons = ({ fetchedUser, toMain }) => {

    const [characters, setCharacters] = useState([])
    const [date, setDate] = useState("-")
    const [prio, setPrio] = useState()
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
    const [activePanel, setActivePanel] = useState(ROUTES.LIST);
    const [activeChar, setActiveChar] = useState("Empty")

    function createButton(element) {
        return (
            <Div key={element} id={element}>
                <Button stretched appearance="neutral" size="m" key={element} id={element} onClick={() => toChar(element)}>
                    {element}
                </Button>
            </Div>
        );
    }

    function createInfo(date, prio) {
        return (
            <Div key="infoBlock" id="infoBlock">
                <p>Дата последней партии: {date} </p>
                <p>Приоритет: {prio} </p>
            </Div>
        );
    }

    const go = (panel, char) => {
        setActivePanel(panel);
        setActiveChar(char);
    };

    //TODO fix bug when it does not get user when going back to init page
    const initialState = function () {
        go(ROUTES.LIST, "empty")
    }

    const toChar = function (name) {
        go(ROUTES.CHAR, name)
    }



    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {
                return resp.data
            })
            setCharacters(data.chars)
            setDate(data.date)
            setPrio(data.prio)
            setPopout(null)
        }
        fetchData()
    }, []);
    return (
        <View activePanel={activePanel}>
            <Panel id={ROUTES.LIST} >
                <PanelHeader>Lost Omens</PanelHeader>
                <Group header={<Header mode="secondary">Ваши персонажи</Header>}>
                    <SplitLayout popout={popout}>
                        <SplitCol>
                            {date && prio && createInfo(date, prio)}
                            {characters && characters.map((elem) => createButton(elem))}
                        </SplitCol>
                    </SplitLayout>
                    <FixedLayout vertical="bottom">
                        <Div>
                            <Button stretched appearance="negative" size="l" onClick={toMain}>
                                Go back
                            </Button>
                        </Div>
                    </FixedLayout>
                </Group>
            </Panel>
            <Character id={ROUTES.CHAR} fetchedUser={fetchedUser} go={initialState} charName={activeChar} url={GOOGLE_SCRIPTS_BASE_URL}/>
        </View>
    )
};


export default CharacterButtons;