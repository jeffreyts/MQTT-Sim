import TopicDefinition from '../models/TopicDefinition';

export default interface TopicProps {
    topicDefinition: TopicDefinition;
    onSave: (t: TopicDefinition) => void;
    onDelete: (name: string) => void;
}