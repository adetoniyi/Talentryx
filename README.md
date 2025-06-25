# Talentryx

Here’s a breakdown of the **Talentryx API: A Scalable Job Platform Engine with TypeScript**

### **Project: Talentryx API**

#### **Tech Stack:**

- **Backend Framework**: Node.js (with Express) with TS
- **Database**: MongoDB (local and or MongoDB Atlas)
- **ORM**: Mongoose
- **File Storage**: Cloudinary (for resumes and profile pictures)
- **API Documentation**: Swagger

### **Features & Requirements:**

1. **Authentication & Authorization:**

   - Implement JWT-based authentication.
   - Two user roles: **Admin (Company)** and **User (Job Seeker)**.
   - **Admin** can post jobs, update job listings, and delete them.
   - **Users** can create profiles, upload resumes, browse, and apply for jobs.

2. **Job Listings:**

   - CRUD operations for job listings.
   - Jobs should have fields like:
     - Title
     - Company name
     - Job description
     - Location
     - Job type (Full-time, Part-time, Contract)
     - Salary range (optional)
     - Application deadline
   - Users can filter and search jobs by category, location, and job type.

3. **User Profiles:**

   - CRUD operations for user profiles.
   - Users can upload resumes (stored on Cloudinary) and profile pictures.
   - A user profile contains:
     - Name
     - Email
     - Phone number
     - Resume URL
     - Profile picture URL
     - Work experience and skills (optional)
     - etc

4. **Job Applications:**

   - Users can apply for jobs by submitting their resumes.
   - An admin should be able to view a list of all applications for their posted jobs.

5. **Admin Dashboard:**

   - Admins can view all job listings they’ve posted.
   - They can also view the applicants for each job, along with their resumes and contact details.
   - They can take other actions on the application such as rejecting, proceeding to the next stage (keep it accepted at this stage to avoid complexities)

6. **Cloudinary Integration:**

   - Upload resumes and profile pictures to Cloudinary.
   - Store URLs for uploaded files in MongoDB.

7. **API Documentation:**

   - Use **Swagger** for full API documentation, including endpoints, request/response bodies, and authentication details.

8. **Database Schema (using Mongoose):**
   - **User** model related to job applications.
   - **Job Listing** model with fields for job details.
   - **Application** model linking users to jobs.
   - etc

#### **Extra Challenges (Optional):**

- Add pagination to the job listing and application endpoints.

### **Project Deliverables:**

- Functional API deployed locally and on MongoDB Atlas.
- API documentation via Swagger.
- Source code repository (GitHub) with clear instructions for setup and testing. Also, include the link to your hosted swagger/api docs in readme of this project.
- Host on Render or any hosting provider.
- Take note of key details such as project structure, making sure it adheres to Softcode's standard
- Submission deadline (Friday 23rd of May 2025, 12 PM WAT). Good luck

This project will help interns demonstrate their ability to work with a full-fledged API using modern technologies while managing real-world functionalities. Would you like to proceed with setting up more detailed specs or guidelines?
