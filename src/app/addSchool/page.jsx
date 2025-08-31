"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./addSchool.css";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(0); // force-remount form to clear file input

  const onSubmit = async (data) => {
    setMessage("");
    try {
      // Upload image
      const fd = new FormData();
      fd.append("image", data.image[0]);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        setMessage(uploadData.error || "Image upload failed");
        return;
      }
      const imagePath = uploadData.filePath;

      // Save school (with duplicate check handled in the API)
      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          address: data.address.trim(),
          city: data.city.trim(),
          state: data.state.trim(),
          contact: String(data.contact),
          email_id: data.email_id.trim(),
          image: imagePath,
        }),
      });

      if (res.ok) {
        setMessage("School added successfully!");
        reset(); //  clears text/number inputs
        setFormKey((k) => k + 1); //  re-mounts form to clear file input reliably
      } else {
        const { error } = await res.json();
        setMessage(error || "Error adding school");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Add School</h1>
      <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="School Name"
        />
        {errors.name && <span className="error">Name required</span>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
        />
        <input {...register("city", { required: true })} placeholder="City" />
        <input {...register("state", { required: true })} placeholder="State" />
        <input
          {...register("contact", { required: true })}
          type="number"
          placeholder="Contact"
        />

        <input
          {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email"
        />
        {errors.email_id && <span className="error">Valid email required</span>}

        <input {...register("image", { required: true })} type="file" />
        {errors.image && <span className="error">Image is required</span>}

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
