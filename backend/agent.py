from typing import TypedDict

from langgraph.graph import StateGraph, END

from tools import (
    log_interaction_tool,
    summarize_interaction_tool,
    sentiment_analysis_tool,
    followup_tool,
    edit_interaction_tool
)


class AgentState(TypedDict):
    text: str
    result: str


def log_node(state):
    return {
        "text": state["text"],
        "result": log_interaction_tool.invoke(
            {"text": state["text"]}
        )
    }


graph = StateGraph(AgentState)

graph.add_node(
    "log_interaction",
    log_node
)

graph.set_entry_point(
    "log_interaction"
)

graph.add_edge(
    "log_interaction",
    END
)

agent = graph.compile()