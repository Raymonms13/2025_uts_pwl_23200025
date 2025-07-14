import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

// GET all customers
export async function GET() {
  const customers = await prisma.customer.findMany();
  return NextResponse.json(customers);
}

// POST new customer
export async function POST(req) {
  const { name, phone, email } = await req.json();
  const newCustomer = await prisma.customer.create({
    data: { name, phone, email },
  });
  return NextResponse.json(newCustomer);
}