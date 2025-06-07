"use client";

import useCounterStore from '@/lib/store/useCounterStore';

export default function HelpPage() {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">Help & FAQs</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p>
            Welcome to OneClickTeach! This section will guide you through the initial setup and basic features.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium">How do I change my theme?</h3>
              <p>
                You can toggle between light, dark, and system themes using the theme switcher icon in the header.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Where can I find my account settings?</h3>
              <p>
                Account settings are typically found under your profile, usually accessible from the top-right corner of the application (once implemented).
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Support</h2>
          <p>
            If you need further assistance, please don't hesitate to reach out to our support team at support@oneclickteach.example.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Zustand Counter Example</h2>
          <div className="p-4 border rounded-lg space-y-3">
            <p className="text-xl">Current Count: <span className="font-bold">{count}</span></p>
            <div className="flex space-x-2">
              <button
                onClick={increment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment
              </button>
              <button
                onClick={decrement}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decrement
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                onClick={() => incrementBy(5)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increment by 5
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
