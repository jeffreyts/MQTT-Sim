import { createContext } from "react";
import TopicDefinition from "../models/TopicDefinition";

export const TopicContext = createContext<TopicDefinition | null>(null);