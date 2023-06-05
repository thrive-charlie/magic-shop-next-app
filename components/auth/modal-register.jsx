import React, { useState } from "react";
import { TextInput, Alert } from '@mantine/core';
import { BsExclamationTriangle } from "react-icons/bs";
import { BiLogInCircle } from 'react-icons/bi';
import Button from "../common/button";

export default function ModalRegister({ close, setView }) {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const registerHandle = (event) => {
        event.preventDefault();
        console.log('register');
        setLoading(true);
    };

  return (
    <>
      <header className="text-center mb-4">
        <h2 className="text-3xl font-bold tracking-tighter mb-2">Register</h2>
        <p className="max-w-md mx-auto">Sign up for an account to unlock trader pricing and extra customisation options.</p>
      </header>
      <div className="mb-12 max-w-md mx-auto">
        <form onSubmit={registerHandle}>
          {error && (
            <Alert
              icon={<BsExclamationTriangle className="w-6 h-6" />}
              color="red"
              variant="outline"
              className="mb-4"
            >
              We could not find an account with those details. Have you
              <button
                onClick={() => setView("forgot")}
                className="text-blue-500 underline bg-transparent transition-all hover:opacity-75"
              >
                Forgot your password?
              </button>
            </Alert>
          )}
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            className="mb-4"
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            className="mb-4"
            required
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="mb-4"
            required
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="mb-8"
            required
          />
          <div className="flex flex-col justify-center items-center">
            <Button type="submit" loading={loading} icon={BiLogInCircle}>
              Register
            </Button>
            <p className="mt-4">
              Already have an account?
              <button
                onClick={() => setView("login")}
                type="button"
                className="ml-1 bg-transparent text-blue-500 underline transition-all hover:opacity-75"
              >
                login
              </button>
              .
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
