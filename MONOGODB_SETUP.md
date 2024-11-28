# MongoDB Atlas Setup Instructions

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas

2. Create a new project named "BullWyze"

3. Build a new cluster:
   - Choose the FREE tier
   - Select your preferred region
   - Choose "M0 Sandbox" (Free tier)
   - Name your cluster "bullwyze-cluster"

4. Set up database access:
   - Go to Security > Database Access
   - Add a new database user
   - Choose password authentication
   - Generate and save a secure password
   - Set user privileges to "Atlas admin"

5. Configure network access:
   - Go to Security > Network Access
   - Add a new IP address
   - Choose "Allow access from anywhere" (Not recommended for production)

6. Get your connection string:
   - Go to Clusters > Connect
   - Choose "Connect your application"
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string

7. Set up environment variables:
   - Create a `.env.local` file in your project root
   - Add your MongoDB URI:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@bullwyze-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials

8. For Vercel deployment:
   - Go to your project settings in Vercel
   - Add the MONGODB_URI environment variable
   - Ensure the value is the same as your local `.env.local` file

Note: For production, make sure to:
- Use a more restrictive IP whitelist
- Enable MongoDB Atlas backup
- Consider upgrading to a paid tier for better performance
- Enable database auditing
- Regularly rotate database credentials