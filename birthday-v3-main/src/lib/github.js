import { Octokit } from "@octokit/rest";

// GitHub configuration - update these values
const GITHUB_CONFIG = {
  owner: "abhilash-abhi178",
  repo: "Bday-27-main",
  branch: "main",
  filePath: "birthday-v3-main/public/data/visitors.json",
};

export async function saveToGitHub(visitorData) {
  try {
    // Require GitHub token from environment variable
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      console.warn("GITHUB_TOKEN not set - skipping GitHub commit");
      return { success: false, error: "No GitHub token configured" };
    }

    const octokit = new Octokit({ auth: githubToken });

    // 1. Get current file content
    let currentContent = [];
    let currentSha;
    
    try {
      const { data } = await octokit.repos.getContent({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: GITHUB_CONFIG.filePath,
        ref: GITHUB_CONFIG.branch,
      });
      
      currentSha = data.sha;
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      currentContent = JSON.parse(content);
    } catch (error) {
      if (error.status === 404) {
        // File doesn't exist yet, start with empty array
        currentContent = [];
        currentSha = null;
      } else {
        throw error;
      }
    }

    // 2. Add new visitor data
    currentContent.push(visitorData);

    // 3. Create new content
    const newContent = JSON.stringify(currentContent, null, 2);
    const contentBase64 = Buffer.from(newContent).toString("base64");

    // 4. Commit to GitHub
    const commitMessage = `Add visitor message: ${visitorData.timestamp}`;
    
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: GITHUB_CONFIG.filePath,
      message: commitMessage,
      content: contentBase64,
      sha: currentSha,
      branch: GITHUB_CONFIG.branch,
    });

    console.log("✅ Successfully committed to GitHub:", response.data.commit.sha);
    return { success: true, commit: response.data.commit.sha };
    
  } catch (error) {
    console.error("❌ GitHub commit failed:", error.message);
    return { success: false, error: error.message };
  }
}
