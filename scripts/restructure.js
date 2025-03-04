const fs = require("fs-extra");
const path = require("path");

// Base paths
const COMPONENTS_PATH = "src/presentation/components";

// Create structure directly
async function createComponentStructure() {
  console.log("🔧 Creating new component structure...");

  const structure = {
    core: ["primitives", "layouts", "typography"],
    features: ["auth", "profile", "projects", "skillset"],
    shared: ["ui", "modals", "forms", "feedback"],
    providers: ["auth", "theme", "app"],
    hooks: ["ui", "auth", "data"],
    utils: ["animations", "validation", "formatting"],
  };

  // Create directories
  for (const [category, subcategories] of Object.entries(structure)) {
    for (const subcategory of subcategories) {
      const dirPath = path.join(COMPONENTS_PATH, category, subcategory);
      await fs.mkdirp(dirPath);
      console.log(`✅ Created: ${dirPath}`);
    }
  }
}

// Move existing components to new structure
async function moveComponents() {
  console.log("🚚 Moving components to new locations...");

  // Define moves based on our agreed structure
  const moves = [
    // Move UI authentication components to features/auth
    { from: "ui/auth", to: "features/auth" },

    // Move skillset components to features/skillset
    { from: "ui/skillset", to: "features/skillset" },

    // Move modals to shared/modals
    { from: "modals", to: "shared/modals" },

    // First organize UI components into appropriate categories
    // UI Layout components
    { from: "ui/Footer.tsx", to: "core/layouts/Footer.tsx" },
    { from: "ui/NavbarMobile.tsx", to: "core/layouts/NavbarMobile.tsx" },
    {
      from: "ui/Background-boxes.tsx",
      to: "core/layouts/Background-boxes.tsx",
    },
    { from: "ui/SectionMenu.tsx", to: "core/layouts/SectionMenu.tsx" },

    // UI Feedback components
    { from: "ui/Spinner.tsx", to: "shared/feedback/Spinner.tsx" },
    {
      from: "ui/SpinnerContainer.tsx",
      to: "shared/feedback/SpinnerContainer.tsx",
    },
    { from: "ui/PageLoader.tsx", to: "shared/feedback/PageLoader.tsx" },
    { from: "ui/Tooltip.tsx", to: "shared/feedback/Tooltip.tsx" },

    // UI Form components
    { from: "ui/ContactForm.tsx", to: "shared/forms/ContactForm.tsx" },
    { from: "ui/selects", to: "shared/forms/selects" },

    // UI Interaction components
    { from: "ui/interactions", to: "shared/ui/interactions" },
    { from: "ui/Buttons.tsx", to: "shared/ui/Buttons.tsx" },
    { from: "ui/FollowButton.tsx", to: "shared/ui/FollowButton.tsx" },
    { from: "ui/LineSeparator.tsx", to: "core/primitives/LineSeparator.tsx" },
    { from: "ui/Pointer.tsx", to: "shared/ui/Pointer.tsx" },

    // Typography components
    { from: "ui/Texts.tsx", to: "core/typography/Texts.tsx" },
    { from: "ui/Typewriter.tsx", to: "core/typography/Typewriter.tsx" },

    // Profile-related components
    { from: "ui/MyProfilePic.tsx", to: "features/profile/MyProfilePic.tsx" },
    {
      from: "ui/SessionProfilePic.tsx",
      to: "features/profile/SessionProfilePic.tsx",
    },
    {
      from: "ui/UserStatsExpandable.tsx",
      to: "features/profile/UserStatsExpandable.tsx",
    },

    // Project-related components
    { from: "ui/Project.tsx", to: "features/projects/Project.tsx" },
    {
      from: "ui/ProjectLinkInteractions.tsx",
      to: "features/projects/ProjectLinkInteractions.tsx",
    },
    {
      from: "ui/ProducerGallery.tsx",
      to: "features/projects/ProducerGallery.tsx",
    },

    // Stats and cards components
    { from: "ui/StatsCard.tsx", to: "shared/ui/cards/StatsCard.tsx" },
    { from: "ui/StatsCardTwo.tsx", to: "shared/ui/cards/StatsCardTwo.tsx" },
    { from: "ui/StatsDropdowns.tsx", to: "shared/ui/cards/StatsDropdowns.tsx" },
    {
      from: "ui/ExpandableCardDemo.tsx",
      to: "shared/ui/cards/ExpandableCardDemo.tsx",
    },
    { from: "ui/CardStack.tsx", to: "shared/ui/cards/CardStack.tsx" },
    {
      from: "ui/CollapsableCalendar.tsx",
      to: "shared/ui/CollapsableCalendar.tsx",
    },

    // Place any remaining UI components in shared/ui
    // ... can add more specific moves based on files remaining in /ui

    // Keep providers in the providers directory but organize into subcategories
    // We'll need to check what's in the providers directory first
  ];

  for (const move of moves) {
    const fromPath = path.join(COMPONENTS_PATH, move.from);
    const toPath = path.join(COMPONENTS_PATH, move.to);

    try {
      if (fs.existsSync(fromPath)) {
        // Create parent directory if it doesn't exist
        const toDir = path.dirname(toPath);
        if (!fs.existsSync(toDir)) {
          await fs.mkdirp(toDir);
        }

        await fs.move(fromPath, toPath, { overwrite: true });
        console.log(`✅ Moved: ${fromPath} → ${toPath}`);
      } else {
        console.log(`⚠️ Skipped: ${fromPath} (not found)`);
      }
    } catch (error) {
      console.error(`❌ Error moving ${fromPath}: ${error.message}`);
    }
  }
}

// Create index files for barrel exports
async function createIndexFiles() {
  console.log("📁 Creating index files for exports...");

  // We'll implement this in a future step if needed
}

async function main() {
  try {
    await createComponentStructure();
    await moveComponents();
    // await createIndexFiles(); // We can add this later if needed

    console.log("🎉 Component restructuring completed successfully!");
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
}

main();
