import { TopicInfoDB } from '../interfaces/database-interfaces/db-topics.interface';
import { TopicInfo } from '../interfaces/topic.interface';
import topicDataPreparator, { bigIntFieldToNumber } from './common/topic.methods.js';
import pool from './pool.js';

const getTopics = async (): Promise<TopicInfo[]> => {
    let conn
    try {
        const sql = `SELECT * FROM topics`;
        conn = await pool.getConnection()

        const result = (await conn.query(sql)) as TopicInfoDB[];

        if (!result[0]) {
            throw new Error();
        }
        return result.map(topicDataPreparator);
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release()
    }
};

const getCourseTopics = async (courseId: number): Promise<number[]> => {
    let conn
    try {
        const sql = `
    SELECT group_CONCAT(topic_id) as topics FROM topics_courses
    WHERE course_id = ? GROUP BY course_id`;

        conn = await pool.getConnection()
        const result = await conn.query(sql, [courseId]);

        if (!result[0]) {
            return [];
        }

        return result[0].topics.split(',').map((item: string) => +item);
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release()
    }
};

const addCourseTopics = async (courseId: number, topics: number[]) => {
    let conn
    try {
        const sql = `
    INSERT INTO topics_courses (topic_id, course_id)
    VALUES ${topics.map((item) => `(?, ${courseId})`).join(', ')}
    `;

        conn = await pool.getConnection()

        const result = await conn.query(sql, [...topics]);

        return result;
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release()
    }
};

const deleteCourseTopics = async (courseId: number, topics: number[]) => {
    let conn
    try {
        const sql = `
    DELETE FROM topics_courses
    WHERE course_id = ? AND (${topics
      .map((item) => `topic_id = ?`)
      .join(' OR ')})`;

        conn = await pool.getConnection()
        const result = await conn.query(sql, [courseId, ...topics]);

        return result;
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release()
    }
};

const getMostPopularTopics = async () => {
    let conn
    try {
        const sql = `
    SELECT
      t.topic_id as topicId,
      topic_name as topicName,
      COUNT(course_id) as courseCount
    FROM topics_courses as tc
    JOIN topics as t
      ON t.topic_id = tc.topic_id
    GROUP BY tc.topic_id
    ORDER BY courseCount DESC
    LIMIT 6;
    `;

        conn = await pool.getConnection()
        const result = await conn.query(sql);

        return result.map(bigIntFieldToNumber);
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.release()
    }
};

export const topicsData = {
    getTopics,
    getCourseTopics,
    addCourseTopics,
    deleteCourseTopics,
    getMostPopularTopics
};
