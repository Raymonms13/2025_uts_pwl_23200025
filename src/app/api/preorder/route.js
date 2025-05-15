
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    console.log("Preorder GET API hit!")

    const preorders = await prisma.preorder.findMany()
    console.log("Data preorder:", preorders)

    return new Response(JSON.stringify(preorders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error("API error:", error)

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(request) {
    const { order_date, order_by, selected_package, qty, status } = await request.json();

    if (!order_date || !order_by || !selected_package || !qty || !status) {
        return new Response(JSON.stringify ({ error: 'Semua field wajib diisi' }), {
            status: 400,
        });
    }

    const validOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";

    const preorder = await prisma.preorder.create({
        data: { order_date: validOrderDate, order_by, selected_package, qty: parseInt(qty), is_paid },
    });

    // format tampilan hasil di Postman
    preorder.order_date = preorder.order_date.toISOString().split('T')[0];
    preorder.status = is_paid ? "Lunas" : "Belum Lunas";
    delete preorder.is_paid;

    return new Response(JSON.stringify(preorder), { status: 201 });
}