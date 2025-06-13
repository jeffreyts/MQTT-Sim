import { createSlice } from "@reduxjs/toolkit";
import TopicDefinition from "../models/TopicDefinition";

const selectedTopicSlice = createSlice({
    name: 'selectedTopic',
    initialState: {
        value: undefined as TopicDefinition | undefined
    },
    reducers: {
        setSelectedTopic: (state, action) => {
            state.value = action.payload;
        },
        resetSelectedTopic: (state) => {
            state.value = undefined;
        }
    }
});

export const { setSelectedTopic, resetSelectedTopic } = selectedTopicSlice.actions;

export default selectedTopicSlice.reducer;