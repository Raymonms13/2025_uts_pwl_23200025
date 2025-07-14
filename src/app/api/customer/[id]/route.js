import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

// GET customer by id
export async function GET(_, { params }) {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(customer);
}

// PUT update customer by id
export async function PUT(req, { params }) {
  const { name, phone, email } = await req.json();
  const updatedCustomer = await prisma.customer.update({
    where: { id: parseInt(params.id) },
    data: { name, phone, email },
  });
  return NextResponse.json(updatedCustomer);
}

// DELETE customer by id
export async function DELETE(_, { params }) {
  await prisma.customer.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Customer deleted" });
}