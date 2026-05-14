import { FormEvent, useState } from "react";
import api from "../lib/api";

type ChatResponse = {
  response: string;
  detail?: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const InterviewPrep = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ChatResponse>("/resumes/chat", {
        message: userMessage,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (err) {
      setError("Unable to reach the coach. Upload a resume first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Resume chatbot
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">
          Chat with an AI coach about your resume.
        </h2>
        <p className="mt-3 text-sm text-ink-600">
          Ask for rewrites, clarity fixes, or role alignment tips. The coach
          will respond with structured guidance.
        </p>
        <form onSubmit={handleSend} className="mt-6 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 rounded-full border border-sand-200/80 bg-sand-50/70 px-4 py-2 text-sm text-ink-700 outline-none focus:border-ink-300"
            placeholder="Ask a question about your resume..."
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {error ? (
          <p className="mt-4 text-sm text-ink-600">{error}</p>
        ) : null}
      </div>

      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Conversation
        </p>
        <div className="mt-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-ink-500">
              Start a conversation to see interview coaching guidance.
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-auto w-[85%] rounded-2xl bg-ink-900 px-4 py-3 text-sm text-sand-50"
                    : "mr-auto w-[85%] rounded-2xl border border-sand-200/70 bg-sand-50/80 px-4 py-3 text-sm text-ink-700"
                }
              >
                {message.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
