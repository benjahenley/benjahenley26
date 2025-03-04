import fs from "fs-extra";
import path from "path";

const COMPONENTS_PATH = "src/presentation/components";
const BACKUP_PATH = "src/presentation/components_backup";

interface DirectoryStructure {
  core: {
    primitives: string[];
    layouts: string[];
    typography: string[];
  };
  features: {
    auth: string[];
    profile: string[];
    projects: string[];
    skillset: string[];
  };
  shared: {
    ui: string[];
    modals: string[];
    forms: string[];
    feedback: string[];
  };
  providers: {
    auth: string[];
    theme: string[];
    app: string[];
  };
  hooks: {
    ui: string[];
    auth: string[];
    data: string[];
  };
  utils: {
    animations: string[];
    validation: string[];
    formatting: string[];
  };
}

const createBackup = async () => {
  try {
    // Create backup if it doesn't exist
    if (!fs.existsSync(BACKUP_PATH)) {
      await fs.copy(COMPONENTS_PATH, BACKUP_PATH);
      console.log("✅ Backup created successfully");
    } else {
      console.log("⚠️ Backup already exists");
    }
  } catch (error) {
    console.error("❌ Error creating backup:", error);
    throw error;
  }
};

const restoreFromBackup = async () => {
  try {
    if (fs.existsSync(BACKUP_PATH)) {
      // Remove current components directory
      await fs.remove(COMPONENTS_PATH);
      // Restore from backup
      await fs.copy(BACKUP_PATH, COMPONENTS_PATH);
      // Remove backup
      await fs.remove(BACKUP_PATH);
      console.log("✅ Successfully restored from backup");
    } else {
      console.log("❌ No backup found to restore from");
    }
  } catch (error) {
    console.error("❌ Error restoring from backup:", error);
    throw error;
  }
};

const createNewStructure = async () => {
  try {
    const structure: DirectoryStructure = {
      core: {
        primitives: [],
        layouts: [],
        typography: [],
      },
      features: {
        auth: [],
        profile: [],
        projects: [],
        skillset: [],
      },
      shared: {
        ui: [],
        modals: [],
        forms: [],
        feedback: [],
      },
      providers: {
        auth: [],
        theme: [],
        app: [],
      },
      hooks: {
        ui: [],
        auth: [],
        data: [],
      },
      utils: {
        animations: [],
        validation: [],
        formatting: [],
      },
    };

    // Create directory structure
    for (const [category, subcategories] of Object.entries(structure)) {
      for (const subcategory of Object.keys(subcategories)) {
        const dirPath = path.join(COMPONENTS_PATH, category, subcategory);
        await fs.mkdirp(dirPath);
      }
    }

    console.log("✅ New directory structure created");
  } catch (error) {
    console.error("❌ Error creating new structure:", error);
    throw error;
  }
};

const moveComponents = async () => {
  try {
    // Example moves - we'll expand this based on your current components
    const moves = [
      { from: "ui/auth", to: "features/auth" },
      { from: "ui/skillset", to: "features/skillset" },
      { from: "modals", to: "shared/modals" },
      { from: "providers", to: "providers" },
    ];

    for (const move of moves) {
      const fromPath = path.join(COMPONENTS_PATH, move.from);
      const toPath = path.join(COMPONENTS_PATH, move.to);

      if (fs.existsSync(fromPath)) {
        await fs.move(fromPath, toPath, { overwrite: true });
      }
    }

    console.log("✅ Components moved successfully");
  } catch (error) {
    console.error("❌ Error moving components:", error);
    throw error;
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case "restructure":
        await createBackup();
        await createNewStructure();
        await moveComponents();
        console.log("✅ Restructuring completed successfully");
        break;

      case "undo":
        await restoreFromBackup();
        console.log("✅ Changes undone successfully");
        break;

      default:
        console.log(`
Usage:
  npm run restructure -- restructure  # Restructure components
  npm run restructure -- undo         # Undo changes
        `);
    }
  } catch (error) {
    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
};

main();
