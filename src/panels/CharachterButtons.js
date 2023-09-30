import React, { useEffect, useState } from 'react';
import { Button, Div, Group, ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import axios from 'axios';


const GOOGLE_SCRIPTS_BASE_URL = 'https://script.google.com/macros/s/AKfycbx_Y1dLQHzv8SVQW60HDWK8NGHQA5PNiZnKlbAnEKemw-36LH_g96octlsW5BgLS8aPCg/exec'
//TODO func to navigate to charachter

function createButton(element) {
    return (
        <Div key={element} id={element}>
            <Button stretched appearance="neutral" size="m" key={element} id={element}>
                {element}
            </Button>
        </Div>
    );
}


const CharachterButtons = ({ fetchedUser }) => {

    const [charachters, setCharachters] = useState([])
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />)

    useEffect(() => {
        async function fetchData() {
            const charList = await axios.get(GOOGLE_SCRIPTS_BASE_URL + "?id=" + fetchedUser.screen_name).then(resp => {
                return resp.data.chars
            })
            setCharachters(charList)
            setPopout(null)
        }
        fetchData()
    }, []);
    return (
        <SplitLayout popout={popout}>
            <SplitCol>
                {charachters && charachters.map((elem) => createButton(elem))}
            </SplitCol>
        </SplitLayout>
    )
};


export default CharachterButtons;