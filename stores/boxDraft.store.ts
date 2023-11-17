import BoxState from '@/boxState';
import { create } from 'zustand';

type BoxDraft = {
    id: string;
    title: string;
    description: string;

    html: string;
    css: string;
    js: string;

    state: typeof BoxState[keyof typeof BoxState];
};

type BoxDraftStore = {
    boxDraft: BoxDraft;
    actions: {
        setDraft: (boxDraft: BoxDraft) => void,
        updateTitle: (title: string) => void,
        updateState: (state: typeof BoxState[keyof typeof BoxState]) => void,
        updateCode: (html: string, css: string, js: string) => void,
    },
};

export const useBoxDraftStore = create<BoxDraftStore>((set) => ({
    boxDraft: {
        id: '',
        title: '',
        description: '',

        html: '',
        css: '',
        js: '',

        state: BoxState.DRAFT,
    },
    actions: {
        setDraft: (boxDraft) => set(() => ({ boxDraft })),
        updateTitle: (title) => set((state) => ({ boxDraft: { ...state.boxDraft, title } })),
        updateState: (newState) => set((state) => ({ boxDraft: { ...state.boxDraft, state: newState } })),
        updateCode: (html, css, js) => set((state) => ({ boxDraft: { ...state.boxDraft, html, css, js } })),
    },
}));
