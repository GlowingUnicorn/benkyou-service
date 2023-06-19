import { TopicInfoDB } from '../../interfaces/database-interfaces/db-topics.interface';
import { TopicInfo } from '../../interfaces/topic.interface';
import { map, mapObjIndexed } from 'ramda'

const topicDataPreparator = (topic: TopicInfoDB): TopicInfo => {
    const topicPrepared = {
        topicId: +topic.topic_id,
        topicName: topic.topic_name
    };

    return topicPrepared;
};

export const bigIntFieldToNumber = (obj: Record<string, any>) => mapObjIndexed(val => typeof val === 'bigint' ? Number(val) : val)(obj)

export default topicDataPreparator;
