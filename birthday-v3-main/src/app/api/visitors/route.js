import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to store visitor data
const dataDir = path.join(process.cwd(), "public", "data");
const visitorsFile = path.join(dataDir, "visitors.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get visitor's IP from request
function getClientIP(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
  return ip;
}

export async function POST(req) {
  try {
    ensureDataDir();

    // Parse request body
    const body = await req.json();
    const { message } = body;

    // Get client IP
    const ip = getClientIP(req);

    // Create visitor record
    const visitorData = {
      message: message || "(No message provided)",
      ip: ip,
      timestamp: new Date().toISOString(),
    };

    // Read existing visitors
    let visitors = [];
    if (fs.existsSync(visitorsFile)) {
      try {
        const fileContent = fs.readFileSync(visitorsFile, "utf-8");
        visitors = JSON.parse(fileContent);
      } catch (error) {
        console.error("Error parsing visitors file:", error);
        visitors = [];
      }
    }

    // Add new visitor
    visitors.push(visitorData);

    // Save to file
    fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));

    console.log("[/api/visitors] New visitor saved:", visitorData);

    return NextResponse.json({
      success: true,
      message: "Visitor data saved successfully",
      data: visitorData,
    });
  } catch (error) {
    console.error("[/api/visitors] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all visitors (optional - for admin viewing)
export async function GET(req) {
  try {
    ensureDataDir();

    if (!fs.existsSync(visitorsFile)) {
      return NextResponse.json({ visitors: [] });
    }

    const fileContent = fs.readFileSync(visitorsFile, "utf-8");
    const visitors = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      totalVisitors: visitors.length,
      visitors: visitors,
    });
  } catch (error) {
    console.error("[/api/visitors] GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
