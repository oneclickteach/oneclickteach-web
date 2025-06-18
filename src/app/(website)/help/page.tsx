"use client";


export default function HelpPage() {
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
            {"If you need further assistance, please don't hesitate to reach out to our support team at support@oneclickteach.example.com."}
          </p>
        </section>
      </div>
    </div>
  );
}
