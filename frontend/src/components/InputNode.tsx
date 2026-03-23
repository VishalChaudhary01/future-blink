import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

export default function InputNode({ data }: { data: any }) {
  const [prompt, setPrompt] = useState(data.prompt ?? "");

  return (
    <div className="p-2 space-y-2 rounded-lg border border-gray-400 w-xs overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Input Node</span>
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          className="nodrag nopan w-full border border-gray-400 rounded p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-200"
          placeholder="Ask anything…"
          value={prompt}
          onChange={(e) => {
            data.onPromptChange?.(e.target.value);
            setPrompt(e.target.value);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          rows={5}
        />
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
