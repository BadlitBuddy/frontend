import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  try {
    const srcAppPath = path.join(__dirname, "..", "src", "app");

    // Find all directories in src/app starting with ( and ending with )
    if (!fs.existsSync(srcAppPath)) {
      console.error(`Error: src/app directory not found at ${srcAppPath}`);
      process.exit(1);
    }

    const items = fs.readdirSync(srcAppPath, { withFileTypes: true });
    const routeGroups = items
      .filter(
        (item) =>
          item.isDirectory() &&
          item.name.startsWith("(") &&
          item.name.endsWith(")"),
      )
      .map((item) => item.name);

    if (routeGroups.length === 0) {
      console.error("Error: No route groups (e.g. (auth)) found in src/app.");
      process.exit(1);
    }

    console.log("\nAvailable Route Groups:");
    routeGroups.forEach((group, index) => {
      console.log(`  ${index + 1}) ${group}`);
    });

    let selectedGroup = "";
    while (!selectedGroup) {
      const choice = await question(
        `\nSelect a route group (1-${routeGroups.length}): `,
      );
      const choiceIndex = parseInt(choice.trim(), 10) - 1;
      const selected = routeGroups[choiceIndex];
      if (selected) {
        selectedGroup = selected;
      } else {
        console.log("Invalid selection. Please try again.");
      }
    }

    let featureName = "";
    while (!featureName) {
      const input = await question(
        "\nEnter feature/page name (e.g., dashboard, user-profile): ",
      );
      const cleanInput = input.trim().toLowerCase();
      if (/^[a-z0-9-_]+$/.test(cleanInput)) {
        featureName = cleanInput;
      } else {
        console.log(
          "Invalid feature name. Use alphanumeric characters, hyphens, or underscores.",
        );
      }
    }

    // Paths
    const appFeaturePath = path.join(srcAppPath, selectedGroup, featureName);
    const featuresDir = path.join(
      __dirname,
      "..",
      "src",
      "features",
      featureName,
    );

    console.log(
      `\nCreating feature "${featureName}" in route group "${selectedGroup}"...`,
    );

    // 1. Create page.tsx in src/app/<route-group>/<feature-name>/page.tsx
    fs.mkdirSync(appFeaturePath, { recursive: true });
    const pageFilePath = path.join(appFeaturePath, "page.tsx");

    // Format feature name to CamelCase for the React component
    const camelCaseFeatureName = featureName
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const pageTemplate = `"use client";

// TODO: Import layout or components from @/features/${featureName}/components if needed

export default function ${camelCaseFeatureName}Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4">${camelCaseFeatureName} Page</h1>
      <p className="text-gray-600">
        This is the ${camelCaseFeatureName} page. Customize it or import components from src/features/${featureName}.
      </p>
    </div>
  );
}
`;

    if (fs.existsSync(pageFilePath)) {
      console.log(
        `⚠️  Page file already exists at: ${path.relative(process.cwd(), pageFilePath)} (skipping)`,
      );
    } else {
      fs.writeFileSync(pageFilePath, pageTemplate);
      console.log(
        `✅ Created page: ${path.relative(process.cwd(), pageFilePath)}`,
      );
    }

    // 2. Create feature directory structure in src/features/<feature-name>
    const subdirs = [
      "api",
      "assets",
      "components",
      "hooks",
      "stores",
      "types",
      "utils",
    ];

    fs.mkdirSync(featuresDir, { recursive: true });

    subdirs.forEach((sub) => {
      const subPath = path.join(featuresDir, sub);
      if (!fs.existsSync(subPath)) {
        fs.mkdirSync(subPath, { recursive: true });
      }
    });

    console.log(
      `✅ Created feature directories in: ${path.relative(process.cwd(), featuresDir)}`,
    );
    subdirs.forEach((sub) => {
      console.log(`   - ${sub}/`);
    });

    console.log("\n🎉 Feature created successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
  }
}

main();
