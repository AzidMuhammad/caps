import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = "DB";

let cachedClient: MongoClient | null = null;

// Function to connect to the database
async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// GET request handler
export const GET = async (req: NextRequest) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection("antrian");

    const { searchParams } = new URL(req.url);
    const platNomor = searchParams.get("platNomor");
    const tipeMobil = searchParams.get("tipeMobil");
    const createdAt = searchParams.get("createdAt");
    const nomorTelepon = searchParams.get("nomorTelepon");

    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const filter: any = {};
    if (platNomor) filter.platNomor = platNomor;
    if (tipeMobil) filter.tipeMobil = tipeMobil;
    if (nomorTelepon) filter.nomorTelepon = nomorTelepon;
    if (createdAt) {
      const date = new Date(createdAt);
      filter.createdAt = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      };
    } else {
      filter.createdAt = {
        $gte: startOfDay,
        $lt: endOfDay,
      };
    }

    const data = await collection.find(filter).toArray();
    const totalIncome = data.reduce((acc, item) => acc + (item.harga || 0), 0);

    return NextResponse.json({
      data,
      totalIncome: totalIncome.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

// POST request handler (to create new antrian)
export const POST = async (req: NextRequest) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection("antrian");

    const body = await req.json();
    const { namaPelanggan, platNomor, nomorTelepon, tipeMobil, harga, deskripsi, status } = body;

    if (!namaPelanggan || !platNomor || !nomorTelepon || !tipeMobil || !harga) {
      return NextResponse.json(
        { error: "Semua field kecuali deskripsi dan status wajib diisi!" },
        { status: 400 }
      );
    }

    const newAntrian = {
      namaPelanggan,
      platNomor,
      nomorTelepon,
      tipeMobil,
      harga: parseFloat(harga),
      deskripsi: deskripsi || "",
      status: status || "Queue",
      createdAt: new Date(),
    };

    await collection.insertOne(newAntrian);

    return NextResponse.json(
      { message: "Data antrian berhasil ditambahkan", data: newAntrian },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection("antrian");

    const body = await req.json();
    const { _id, ...updateData } = body;

    // Check if _id is provided in the request body
    if (!_id) {
      return NextResponse.json({ error: "_id is required for update" }, { status: 400 });
    }

    // Ensure we're not trying to update _id (immutable)
    if (updateData._id) delete updateData._id;

    // Check if the _id is a valid ObjectId
    if (!ObjectId.isValid(_id)) {
      return NextResponse.json({ error: "Invalid _id format" }, { status: 400 });
    }

    // Find the document by _id
    const existingItem = await collection.findOne({ _id: new ObjectId(_id) });
    if (!existingItem) {
      return NextResponse.json({ error: "No data found with this _id" }, { status: 404 });
    }

    // Update the document using _id
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) }, // Use _id to find the document
      { $set: updateData }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No data was updated" }, { status: 400 });
    }

    return NextResponse.json({ message: "Data updated successfully" });

  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: `Failed to update data: ${error}` }, { status: 500 });
  }
};


export const DELETE = async (req: NextRequest) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection("antrian");

    const { searchParams } = new URL(req.url);
    const nomorTelepon = searchParams.get("nomorTelepon");
    const id = searchParams.get("_id"); // Get _id from query params if provided

    if (!nomorTelepon && !id) {
      return NextResponse.json({ error: "nomorTelepon or _id is required for deletion" }, { status: 400 });
    }

    let result;

    // If _id is provided, use it to find the document
    if (id) {
      result = await collection.deleteOne({ _id: new ObjectId(id) });
    } else {
      result = await collection.deleteOne({ nomorTelepon });
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "No data found with this identifier" }, { status: 404 });
    }

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
};
