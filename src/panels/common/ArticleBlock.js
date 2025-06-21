import { Group, Header, CardGrid, ContentCard } from "@vkontakte/vkui";


const ArticleBlock = ({
    articleLink, caption, description, image
}) => {
    return (
        <Group mode='card' header={<Header mode='secondary'>О мегакампании</Header>}>
            <CardGrid size="l">
                <ContentCard
                    onClick={() => { window.open(articleLink) }}
                    subtitle="Статья о мегакампании"
                    header={caption}
                    text={description}
                    src={image}
                    maxHeight={150}
                />
            </CardGrid>
        </Group>
    );
}

export default ArticleBlock;