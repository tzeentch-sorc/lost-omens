import { Group, Header, CardGrid, ContentCard } from "@vkontakte/vkui";


const ArticleBlock = ({
    articleLink, caption, description, image
}) => {
    return (
        <Group mode='card' header={<Header size='s'>О мегакампании</Header>}>
            <CardGrid size="l">
                <ContentCard
                    onClick={() => { window.open(articleLink) }}
                    overTitle="Статья о мегакампании"
                    title={caption}
                    description={description}
                    src={image}
                    maxHeight={150}
                />
            </CardGrid>
        </Group>
    );
}

export default ArticleBlock;