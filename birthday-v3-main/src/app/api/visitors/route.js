import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { saveToGitHub } from "@/lib/github";

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

    // Create IST timestamp (UTC + 5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    const istTimestamp = istTime.toISOString().replace('Z', '+05:30');

    // Create visitor record
    const visitorData = {
      message: message || "(No message provided)",
      ip: ip,
      timestamp: istTimestamp,
    };

    // Try to save locally first (for development)
    let localSaveSuccess = false;
    try {
      ensureDataDir();
      
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
      localSaveSuccess = true;
      console.log("✅ [Local] Visitor saved to file:", visitorData);
      
    } catch (error) {
      // If local save fails (e.g., read-only filesystem in production)
      console.warn("⚠️ [Local] Cannot save to file (expected in production):", error.code);
      
      // Fall back to GitHub API
      console.log("🔄 Attempting to save to GitHub...");
      const githubResult = await saveToGitHub(visitorData);
      
      if (githubResult.success) {
        console.log("✅ [GitHub] Visitor committed:", githubResult.commit);
        return NextResponse.json({
          success: true,
          message: "Visitor data saved to GitHub",
          data: visitorData,
          method: "github",
        });
      } else {
        console.error("❌ [GitHub] Failed:", githubResult.error);
        return NextResponse.json(
          { 
            success: false, 
            error: "Failed to save (filesystem read-only and GitHub unavailable)",
            details: githubResult.error 
          },
          { status: 500 }
        );
      }
    }

    // If local save succeeded, return success
    if (localSaveSuccess) {
      return NextResponse.json({
        success: true,
        message: "Visitor data saved locally",
        data: visitorData,
        method: "local",
      });
    }

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
