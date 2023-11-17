"use client";

import { useRouter } from 'next/navigation';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Formik, Form, Field } from 'formik';
import Link from "next/link";

export function RegistrationForm() {

  const router = useRouter();

  return <div className="flex items-center justify-center w-screen h-screen">
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
      }}
      onSubmit={async (values, { setFieldError }) => {
        const registerRes = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const registerData = await registerRes.json();

        if (registerData.ok) {
          router.push("/");
        } else {
          setFieldError('general', registerData.message);
        }
      }}>
      {({ errors }) => (
        <Form className="md:w-48 lg:w-1/4">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal mb-2">
              Nice to meet you! Enter your details to register.
            </Typography>
            {errors.general && <Typography variant="h6" className="text-red-600">
              {errors.general}
            </Typography>}
            <div className="mb-1 flex flex-col gap-6">
              <label htmlFor="name">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
              </label>
              <Field
                type="name"
                as={Input}
                crossOrigin="anonymous"
                id="name"
                name="name"
                placeholder="Your name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-700"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            /> */}
            <Button className="mt-6" fullWidth type="submit">
              Sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </Card>
        </Form>
      )}
    </Formik>
  </div >
}