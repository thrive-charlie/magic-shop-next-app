"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { getProviders, signIn, useSession } from 'next-auth/react';
import Button from "@/components/common/button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useRouter } from "next/navigation";
// import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {

  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = async e => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}/dashboard`
    });

    if (res.ok) {
      setErrors(false);
      router.push('/dashboard');
    }

  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <form onSubmit={submitForm}>
      {/* Email Address */}
      <div>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          className="block mt-1 w-full"
          onChange={(event) => setEmail(event.target.value)}
          required
          autoFocus
        />

        <InputError messages={errors.email} className="mt-2" />
      </div>

      {/* Password */}
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          value={password}
          className="block mt-1 w-full"
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
        />

        <InputError messages={errors.password} className="mt-2" />
      </div>

      {/* Remember Me */}
      <div className="block mt-4">
        <label htmlFor="remember_me" className="inline-flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            name="remember"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(event) => setShouldRemember(event.target.checked)}
          />

          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div className="flex items-center justify-end mt-4">
        <Link
          href="/forgot-password"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </Link>

        <Button className="ml-3">Login</Button>
      </div>
    </form>
  );
}
