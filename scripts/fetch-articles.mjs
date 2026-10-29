// Pulls the articles from github.com/Epwo/articles into .articles/ before a build.
//
// Writing locally? Point ARTICLES_DIR at your own checkout and nothing is fetched:
//   ARTICLES_DIR=../articles npm run dev
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const REPO = process.env.ARTICLES_REPO ?? "https://github.com/Epwo/articles.git";
const BRANCH = process.env.ARTICLES_BRANCH ?? "main";
const target = resolve(".articles");

if (process.env.ARTICLES_DIR) {
  console.log(`[articles] using local folder ${resolve(process.env.ARTICLES_DIR)}`);
  process.exit(0);
}

const git = (...args) => execFileSync("git", args, { stdio: "inherit" });

try {
  if (existsSync(resolve(target, ".git"))) {
    git("-C", target, "fetch", "--depth", "1", "origin", BRANCH);
    git("-C", target, "reset", "--hard", "FETCH_HEAD");
  } else {
    rmSync(target, { recursive: true, force: true });
    git("clone", "--depth", "1", "--branch", BRANCH, REPO, target);
  }
  console.log(`[articles] up to date (${REPO}@${BRANCH})`);
} catch (err) {
  // Offline dev should still work with whatever was fetched last time.
  if (existsSync(resolve(target, "articles"))) {
    console.warn("[articles] fetch failed, using the cached copy");
  } else {
    throw err;
  }
}
