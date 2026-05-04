"use client";

import registerUser from "@/actions/user";
import { useActionState } from "react";

export default function RegistrationForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState(registerUser, {});
  return (
    <form className="" action={formAction} noValidate>
      <input type="hidden" name="next" value={next} />
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text">Dr.</span>
            <input
              type="text"
              id="first-name"
              name="first-name"
              maxLength={127}
              className={`form-control ${state.error?.properties?.firstName && "is-invalid"}`}
              placeholder="Enter first name"
              defaultValue={state.values?.firstName || ""}
              required
            />
            <div className="invalid-feedback">
              {state.error?.properties?.firstName?.errors}
            </div>
          </div>
        </div>
        <div className="col">
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            className="form-control"
            placeholder="Enter last name"
            defaultValue={state.values?.lastName || ""}
          />
        </div>
      </div>
      {/* Row 2: Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-control ${state.error?.properties?.email && "is-invalid"}`}
          placeholder="Enter email"
          defaultValue={state.values?.email || ""}
          required
        />{" "}
        <div className="invalid-feedback">
          {state.error?.properties?.email?.errors}
        </div>
      </div>
      {/* Row 3: Password & Confirm Password */}
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${state.error?.properties?.password && "is-invalid"}`}
            placeholder="Enter password"
            defaultValue={state.values?.password || ""}
            required
          />
          <div className="invalid-feedback">
            {state.error?.properties?.password?.errors[0]}
          </div>
        </div>
        <div className="col">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className={`form-control ${state.error?.properties?.confirmPassword && "is-invalid"}`}
            placeholder="Confirm password"
            defaultValue={state.values?.confirmPassword || ""}
            required
          />
          <div className="invalid-feedback">
            {state.error?.properties?.confirmPassword?.errors}
          </div>
        </div>
      </div>
      {state.error?.errors.length
        ? state.error?.errors.map((err) => (
            <div className="alert alert-danger" key={err}>
              {err}
            </div>
          ))
        : ""}
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
