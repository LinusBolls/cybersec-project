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
export const getBoxById = async (userId: string | null | undefined, boxId: string) => {

    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);

    const box = await boxRepository.findOne({
        where: {
            id: boxId,
        },
        relations: {
            author: true,
        },
    });
    if (box?.author?.id !== userId && box?.state !== "PUBLISHED") {
        throw new Error("User is not authorized to view this box");
    }
    return box;
}
export const updateBoxState = async (userId: string, boxId: string, state: typeof BoxState[keyof typeof BoxState]) => {
    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);

    const box = await boxRepository.findOneBy({ id: boxId });

    // Validate if the box exists
    if (!box) {
        throw new Error('Box not found');
    }

    if (box.author.id !== userId) {
        throw new Error('User is not authorized to update this box');
    }
    box.state = state;

    await boxRepository.save(box);

    return box;
};

export const updateBoxCode = async (userId: string, boxId: string, html: string, css: string, js: string) => {
    await initializeDb();

    const boxCodeRepository = AppDataSource.getRepository(BoxCode);

    const boxCode = await boxCodeRepository.findOne({
        where: {
            box: {
                id: boxId,
            },
        },
        relations: {
            box: true,
        },
    });

    if (!boxCode) {
        throw new Error('BoxCode not found for the specified box');
    }
    if (boxCode.box.author.id !== userId) {
        throw new Error('User is not authorized to update this box');
    }
    boxCode.html = html;
    boxCode.css = css;
    boxCode.js = js;

    await boxCodeRepository.save(boxCode);

    return boxCode;
};

export const updateBoxMeta = async (userId: string, boxId: string, title: string) => {
    await initializeDb();

    const boxRepository = AppDataSource.getRepository(Box);

    const box = await boxRepository.findOne({
        where: {
            id: boxId,
        },
    });
    if (!box) {
        throw new Error('BoxCode not found for the specified box');
    }
    if (box.author.id !== userId) {
        throw new Error('User is not authorized to update this box');
    }
    box.title = title;

    await boxRepository.save(box);

    return box;
};