import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";
import axios from "axios";
import { toast } from "sonner";

export const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    animated: false,
    style: { stroke: "#3b3a39", strokeWidth: 1 },
  },
];

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePromptChange = useCallback((val: string) => {
    setPrompt(val);
  }, []);

  const initialNodes = [
    {
      id: "n1",
      position: { x: 0, y: 0 },
      type: "inputNode",
      data: { prompt: "", onPromptChange: handlePromptChange },
    },
    {
      id: "n2",
      position: { x: 550, y: 0 },
      type: "resultNode",
      data: { response: "", loading: false },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges],
  );

  const updateNodes = useCallback(
    (newPrompt: string, newResponse: string, newLoading: boolean) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === "n1") {
            return {
              ...node,
              data: { prompt: newPrompt, onPromptChange: setPrompt },
            };
          }
          if (node.id === "n2") {
            return {
              ...node,
              data: { response: newResponse, loading: newLoading },
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  useEffect(() => {
    if (loading) {
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          animated: true,
          style: { stroke: "#3b3a39", strokeWidth: 1, strokeDasharray: "6 3" },
        })),
      );
    } else {
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          animated: false,
          style: {
            stroke: "#3b3a39",
            strokeWidth: 1,
          },
        })),
      );
    }
  }, [loading]);

  const handleRun = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    updateNodes(prompt, "", true);

    try {
      const res = await axios.post("http://localhost:5000/api/ask-ai", {
        prompt,
      });

      const reply = res.data.reply;
      setResponse(reply);
      updateNodes(prompt, reply, false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong, Please try again!",
      );
      updateNodes(prompt, "", false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim() || !response.trim()) return;

    setSaving(true);

    try {
      const res = await axios.post("http://localhost:5000/api/save", {
        prompt,
        response,
      });

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong, Please try again!",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
      />
      <Panel position="bottom-center">
        <div className="flex items-center gap-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-1.5 border rounded-md border-gray-300 shadow-sm text-base font-medium text-gray-700"
          >
            Save
          </button>
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-6 py-1.5 border rounded-md border-gray-300 shadow-sm text-base font-medium bg-gray-700 text-white"
          >
            {loading ? "Running..." : "Run"}
          </button>
        </div>
      </Panel>
    </div>
  );
}
