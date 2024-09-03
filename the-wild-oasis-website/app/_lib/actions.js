"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBookingAction(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this reservation");
  }

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  // If you want to see the form data or have got big data
  // Object.entries(formData.entries());

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  // Redirect to the reservations page
  redirect("/cabins/thankyou");
}

export async function updateBookingAction(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  const bookingId = Number(formData.get("bookingId"));

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this reservation");
  }

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  await updateBooking(bookingId, updateData);

  // Revalidate should come before redirect!!!
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // Redirect to the reservations page
  redirect("/account/reservations");
}

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
