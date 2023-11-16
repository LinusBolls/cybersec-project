"use client";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Formik, Form, Field } from 'formik';
import Link from "next/link";

export function LoginForm() {

  return <div className="flex items-center justify-center w-screen h-screen">
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        const registerRes = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const registerData = await registerRes.json();

        alert(JSON.stringify(registerData, null, 2));
      }}>

      <Form className="md:w-48 lg:w-1/4">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back!
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <label htmlFor="email">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
            </label>
            <Field
              as={Input}
              crossOrigin="anonymous"
              id="email"
              name="email"
              placeholder="Your email"
              type="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-700"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <label htmlFor="password">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
            </label>
            <Field
              type="password"
              as={Input}
              crossOrigin="anonymous"
              id="password"
              name="password"
              placeholder="Your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-700"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {/* <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Remember me
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button className="mt-6" fullWidth type="submit">
            Sign in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </Card>
      </Form>
    </Formik>
  </div >
}