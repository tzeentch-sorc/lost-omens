import React from "react";
import {
    Group, 
} from '@vkontakte/vkui';

const RGImplants = ({ featlist, level = 0, ancestorsHasNext = [] }) => {
    const renderPrefix = (level, isLast, ancestorsHasNext) => {
        let prefix = "";

        for (let i = 0; i < level; i++) {
            if (i === level - 1) {
                prefix += isLast ? "└─ " : "├─ ";
            } else {
                prefix += ancestorsHasNext[i] ? " " : "   ";
            }
        }

        return prefix;
    };

    return (

        <>
            {featlist.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const isLast = idx === featlist.length - 1;
                const newAncestors = [...ancestorsHasNext, !isLast];

                return (
                    <>
                        {renderPrefix(level, isLast, ancestorsHasNext)}
                        {item.name}<br />
                        {hasChildren && (
                            <RGImplants featlist={item.children} level={level + 1} ancestorsHasNext={newAncestors} />
                        )}
                    </>
                );
            })}
        </>
    );

};

export default RGImplants;