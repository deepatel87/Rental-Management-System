const cron = require('node-cron');
const Tenant = require('./model/Tenant'); // Adjust the path as needed

cron.schedule('0 0 1 * *', async () => {
    try {
        const tenants = await Tenant.find({ status: 'Active' }).populate('room');
        
        tenants.forEach(async (tenant) => {
            if (tenant.room && tenant.room.rent) {
                tenant.rentDetails.push({
                    amount: tenant.room.rent,
                    status: 'Unpaid'
                });

                await tenant.save();
            }
        });
    } catch (error) {
        console.error("Error adding monthly rent details:", error);
    }
});

module.exports = {}; // Export an empty object or remove this line if not needed
