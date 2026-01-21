import React from "react";
import {
    Accordion,
    Div,
    Text,
    Group,
    Spacing,
} from "@vkontakte/vkui";

import TextWithLinks from "../../common/components/TextWithLinks";
import "../../common/css/TextWithLinks.css";

const LOQuenta = ({ text }) => {
    const data = [
        {
            id: "quenta",
            title: "Квента",
        },
    ];

    const [openId, setOpenId] = React.useState();

    return (
        <>
            {data.map(({ id, title }) => (
                <Group
                    key={id}
                    separator="hide"
                    mode="plain"
                >
                    <Accordion
                        expanded={openId === id}
                        onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
                    >
                        <Accordion.Summary iconPosition="before">
                            <Text weight="medium">{title}</Text>
                        </Accordion.Summary>
                        <Accordion.Content>
                            <Div className="loquenta-info">
                                <TextWithLinks text={text} />
                                <Spacing size={24} />
                            </Div>
                        </Accordion.Content>
                    </Accordion>
                </Group>
            ))}
        </>
    );
};

export default LOQuenta;
