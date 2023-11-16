import { AppDataSource, initializeDb } from '../ormconfig';

import { Box } from '../models/Box';
import { BoxCode } from '../models/BoxCode';
import { defaultBoxCode1 } from '@/data/defaultBox';
import BoxState from '@/boxState';

export const createBox = async (userId: string, permissions: string[]) => {

    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);
    const boxCodeRepository = AppDataSource.getRepository(BoxCode);

    const newBox = boxRepository.create({
        title: "New box",
        author: {
            id: userId,
        },
    }); const box = await boxRepository.save(newBox);

    const newBoxCode = boxCodeRepository.create({
        html: defaultBoxCode1.html,
        css: defaultBoxCode1.css,
        js: defaultBoxCode1.js,
        box: {
            id: newBox.id,
        },
    });
    const boxCode = await boxCodeRepository.save(newBoxCode);

    return box;
};
/**
 * returns all boxes. filters by `state` if given
 */
export const getBoxes = async ({ state }: { state?: keyof typeof BoxState } = {}) => {

    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);

    const boxes = await boxRepository.find({
        where: {
            ...(state ? { state } : {}),
        },
        relations: {
            boxCode: true,
            author: true,
        },
    }); return boxes;
}
export const getBoxById = async (boxId: string) => {

    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);

    const [box] = await boxRepository.findBy({
        id: boxId,
    });
    return box;
}