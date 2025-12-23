import { Form, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { useEffect, useState } from "react";
import { createUserSession } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "demo@crypto.com" || password !== "demo") {
    return { error: "Invalid credentials" };
  }

  return createUserSession(String(email), "/");
}

export default function Login() {
  const data = useActionData<typeof action>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Form
        method="post"
        className="w-full max-w-sm rounded-xl border p-6 bg-white dark:bg-zinc-900"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          name="email"
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2 bg-white dark:bg-zinc-800"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border px-3 py-2 bg-white dark:bg-zinc-800"
        />

        <button className="w-full rounded bg-zinc-900 text-white py-2 dark:bg-zinc-700">
          Sign in
        </button>

        {data?.error && (
          <p className="mt-3 text-sm text-red-600">{data.error}</p>
        )}

        <p className="mt-3 text-sm text-zinc-500">
          Demo: demo@crypto.com / demo
        </p>
      </Form>
    </main>
  );
}
