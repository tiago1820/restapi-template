## Project Structure

The project follows a specific structure to organize its files and directories.

```plaintext
src                                 # Root directory of the source code
├── index.ts                        # Entry point of the application
├── app.ts                          # Configuration and initialization of the application
├── controllers                     # Controllers to handle business logic
│   ├── courses.controller.ts       # Controller for courses
│   ├── students.controller.ts      # Controller for students
│   └── teacher.controller.ts       # Controller for teachers
├── databases                       # Database connection handling
│   └── connection.ts               # Database connection configuration
├── models                          # Definition of data models
│   ├── course.model.ts             # Model for courses
│   ├── student.model.ts            # Model for students
│   └── teacher.model.ts            # Model for teachers
├── services                        # Contains business logic and database interactions
│   ├── courses.services.ts         # Handles operations related to courses
│   ├── students.services.ts        # Handles operations related to students
│   └── teacher.services.ts         # Handles operations related to teachers
└── routes                          # Definition of API routes
    ├── courses.routes.ts           # Routes for courses
    ├── students.routes.ts          # Routes for students
    └── teachers.routes.ts          # Routes for teachers
```