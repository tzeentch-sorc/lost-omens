import React from "react";
import {
    Group,
} from '@vkontakte/vkui';
import { BadColor, FavouriteColor, GoodColor } from '../../../../consts';

const RGImplants = ({ implantList, level = 0, ancestorsHasNext = [] }) => {
    function highlightAngleBrackets(text) {
        const parts = text.split(/(<[^>]+>)/g);

        return parts.map((part, i) => {
            if (part.match(/^<[^>]+>$/)) {
                // убираем угловые скобки, оставляем содержимое
                const inner = part.slice(1, -1);
                return (
                    <span key={i} style={{
                        color: BadColor,
                        textShadow: `0 0 4px ${BadColor}`
                    }}>
                        {inner}
                    </span>
                );
            }
            return <>{part}</>;
        });
    }
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
            {implantList.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const isLast = idx === implantList.length - 1;
                const newAncestors = [...ancestorsHasNext, !isLast];

                return (
                    <>
                        {renderPrefix(level, isLast, ancestorsHasNext)}
                        {highlightAngleBrackets(item.name)}<br />
                        {hasChildren && (
                            <RGImplants implantList={item.children} level={level + 1} ancestorsHasNext={newAncestors} />
                        )}
                    </>
                );
            })}
        </>
    );

};

export default RGImplants;