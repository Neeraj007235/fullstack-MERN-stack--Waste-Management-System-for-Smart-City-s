import cron from "node-cron"; 
import Work from "../models/work.model.js";

// Schedule a cron job that runs every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1); 

        const formattedYesterday = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

        console.log(`Cron job triggered at ${new Date().toLocaleString()}`);
        console.log(`Deleting work entries for date: ${formattedYesterday}`);

        // Delete all work with the date with previous day
        const result = await Work.deleteMany({ date: formattedYesterday });

        console.log(`${result.deletedCount} work entries deleted for the date: ${formattedYesterday}`);
    } catch (error) {
        console.error('Error deleting previous day work:', error);
    }
});
