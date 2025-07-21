import { urlmodel } from "../models/url.model.js";

const runCleanup = async() => {

try {
    
    const cutoffDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago

    const result = await urlmodel.deleteMany({
      $or: [
        { lastVisited: { $lt: cutoffDate } },
        { lastVisited: null },
      ]
    });

 console.log(`[Cleanup] ${new Date().toISOString()} - Deleted ${result.deletedCount} old URLs`);

} catch (error) {
    console.log('[Cleanup] Failed:', error);
}


}

export default runCleanup;