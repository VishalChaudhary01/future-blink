import { Handle, Position } from "@xyflow/react";

export default function ResultNode({ data }: { data: any }) {
  const { response, loading } = data;

  return (
    <div className="p-2 space-y-2 bg-white rounded-lg border border-gray-400 w-xs overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Result Node</span>
      </div>

      <div className="flex flex-col gap-1 text-gray-600">
        {loading ? (
          <div className="">Generating response...</div>
        ) : response ? (
          <div className="">{response}</div>
        ) : (
          <p className="text-base text-gray-400">
            AI response will appear here
          </p>
        )}
      </div>

      <Handle type="target" position={Position.Left} />
    </div>
  );
}
