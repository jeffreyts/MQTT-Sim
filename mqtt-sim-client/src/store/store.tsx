import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import topicReducer from "./selectedTopicSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        slice: topicReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;