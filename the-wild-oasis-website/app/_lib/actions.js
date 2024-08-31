"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "./data-service";
import { revalidatePath } from "next/cache";

export async function updateGuestAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID number");
  }

  const updateData = {
    nationality,
    nationalID,
    countryFlag,
  };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}