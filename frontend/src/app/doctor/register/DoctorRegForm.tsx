"use client";

import { DoctorRegister } from "@/actions/doctor";
import { useActionState } from "react";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
};

export default function DoctorRegForm({
  firstName,
  lastName,
  email,
  userId,
}: Props) {
  const [state, formAction, isPending] = useActionState(DoctorRegister, {});

  return (
    <form action={formAction} noValidate>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="first-name" className="form-label">
            First Name:
          </label>
          <input
            id="first-name"
            type="text"
            className="form-control"
            disabled
            value={firstName}
          />
        </div>
        <div className="col">
          <label htmlFor="last-name" className="form-label">
            Last Name:
          </label>
          <input
            id="last-name"
            type="text"
            className="form-control"
            disabled
            value={lastName}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">
            E-Mail:
          </label>
          <input
            id=""
            type="text"
            className="form-control"
            disabled
            value={email}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="qualification" className="form-label">
            Qualification:
          </label>
          <input
            id="qualification"
            type="text"
            className={`form-control ${
              state.error?.properties?.qualification && "is-invalid"
            }`}
            name="qualification"
            placeholder="MD / DMS / DHMS"
            defaultValue={state.values?.qualification || ""}
          />
          <div className="invalid-feedback">
            {state.error?.properties?.qualification?.errors[0]}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="specialization" className="form-label">
            Specialization:
          </label>
          <input
            id="specialization"
            type="text"
            className={`form-control ${
              state.error?.properties?.specialization && "is-invalid"
            }`}
            name="specialization"
            placeholder="Dermatology / Oncology / Family Medicine"
            defaultValue={state.values?.specialization || ""}
          />
          <div className="invalid-feedback">
            {state.error?.properties?.specialization?.errors[0]}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="medical-license-number" className="form-label">
            Medical License Number:
          </label>
          <input
            id="medical-license-number"
            type="text"
            className={`form-control ${
              state.error?.properties?.medicalLicenseNumber && "is-invalid"
            }`}
            name="medical-license-number"
            placeholder="XXXX-0000-XXX"
            defaultValue={state.values?.medicalLicenseNumber || ""}
          />
          <div className="invalid-feedback">
            {state.error?.properties?.medicalLicenseNumber?.errors[0]}
          </div>
        </div>
      </div>{" "}
      {state.error?.errors.length
        ? state.error?.errors.map((err) => (
            <div className="alert alert-danger" key={err}>
              {err}
            </div>
          ))
        : ""}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}
