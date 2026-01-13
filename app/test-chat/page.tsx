'use client';

import { useState } from 'react';

export default function TestChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Chat - Can You Type Here?</h1>
        
        <div className="mb-4 p-4 bg-white rounded-lg min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2 p-2 bg-blue-100 rounded">{msg}</div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type something here to test..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            autoFocus
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          If you can type here, the issue is with our chat component. If not, it&apos;s a browser/system issue.
        </p>
      </div>
    </div>
  );
}
